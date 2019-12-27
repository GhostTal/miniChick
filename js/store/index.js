const store = new Vuex.Store({
    state: {
        user: {
          firstGame: 0, // 
          name: '养鸡大户006',
          money: 3000
        },
        // 小鸡信息
        chick: {
          exp: 0,         // 经验值
          upgradeExp: 100,// 升级所需经验
          level: 1,       // 等级
          eat: false,     // 是否在进食
          setTime: 300,   // 喂食时长 300s
          currentSuit: 'default', // 当前套装
          currentHat: 'default',    // 当前帽子
          currentClothes: 'default',  // 当前衣服
          componentHat: 'hat-default', // 默认帽子组件
          componentClothes: 'clothes-default', // 默认衣服组件
          // 鸡蛋
          egg: {
            num: 0,       // 鸡蛋待拾取数量
            allNum: 0,    // 库存鸡蛋总量
            progress: 55, // 鸡蛋进度条
            price: 1000,  // 鸡蛋价格
            eggBase: 50,  // 鸡蛋生成基数值：鸡蛋个数*基数 = 生成鸡蛋增加的数值
            addEggExps: 0 // 每次增加的鸡蛋经验
          }
        },
        // 食物信息
        foods: [{
          id: 1,
          name: '小麦',    // 食物名称
          price: 10,      // 单价
          eatTime: 5000,  // 进食时间 (单位毫秒)
          exp: 100,       // 增加小鸡经验
          num: 2,         // 库存数量
          unlock: 1,      // 0为待解锁，1为已解锁
          unlockPrice: 1  // 解锁金额
        },{
          id: 2,
          name: '香蕉',
          price: 100,
          eatTime: 5000,
          exp: 500,
          num: 0,
          unlock: 0,
          unlockPrice: 100
        },{
          id: 3,
          name: '玉米',
          price: 150,
          eatTime: 120000,
          exp: 800,
          num: 0,
          unlock: 0,
          unlockPrice: 500
        },{
          id: 4,
          name: '苹果',
          price: 450,
          eatTime: 160000,
          exp: 1000,
          num: 0,
          unlock: 0,
          unlockPrice: 1000
        },{
          id: 5,
          name: '榴莲',
          price: 650,
          eatTime: 170000,
          exp: 1100,
          num: 0,
          unlock: 0,
          unlockPrice: 1300
        },{
          id: 6,
          name: '车厘子',
          price: 750,
          eatTime: 180000,
          exp: 1200,
          num: 0,
          unlock: 0,
          unlockPrice: 1500
        }],
        startDate: '',    // 开始时间
        endDate: '',      // 结束时间
        content: '',      // 倒计时
        currFood: {},     // 当前选中的食物
        modalLevel: false,// 升级弹窗
        // 进度条
        value: 0
    },
    mutations: {
        // 首次游戏改变状态
        startGame (state,pid) {
          state.user.firstGame = pid;
          this.commit('save');
          //this.commit('load');
        },
        // 判断是否正在进食
        CHICK_IS_EAT (state) {
            // 页面加载获取当前时间
            let loadDate = new Date().getTime();
            // 判断上一次是否进食结束
            let isEat = state.endDate - loadDate;
            if (isEat > 0) {
                state.chick.eat = true;
                this.commit('countdown', loadDate);
            } else {
                state.enddate = '';
                state.chick.eat = false;
                this.commit('SAVE_GAME');
                state.content = '大佬，肚饥咧！';
                return;
            }
        },
        feedClick (state,endDate) {
            // 得到选中的食物
            // state.foods.forEach(obj => {
            //   if (obj.name === r) {
            //     state.currFood = obj
            //   }
            // // })
            // let startDate = new Date().getTime();
            // let endDate = startDate + state.currFood.eatTime;
            //state.startDate = startDate;
            state.endDate = endDate;
            state.currFood.num--;  // 扣除食物数量
            state.chick.eat = true;
            this.commit('SAVE_GAME');
            //this.commit('countdown', startDate);
            
        },
        shopFood (state,name) {
          // 得到需要购买的食物
          state.foods.forEach(obj => {
            if (obj.name === name) {
              state.currFood = obj
            }
          });

        },
        UNLOCK_FOOD (state,price) {
          state.currFood.unlock = 1;
          state.user.money = state.user.money - price;
        },
        SHOP_SETTLE (state,num) {
          state.currFood.num = num;
          state.user.money = state.user.money - state.currFood.price * num;
          console.log("购买了"+num+"个"+state.currFood.name);
        },
        // 进食结束
        END_EAT (state) {
            state.enddate = '';    // 倒计时结束清零结束时间
            state.chick.eat = false;     // 进食状态设为false
            // 结束结算
            this.commit('settleExp');
            this.commit('SAVE_GAME');          // 存档
            state.content = '喂食结束';
            setTimeout (function() {
              state.content = '阴公，好嗨饿！';
            },2000)
        },
        endEat (state) {
            state.enddate = '';    // 倒计时结束清零结束时间
            state.chick.eat = false;     // 进食状态设为false
            // 结束结算
            this.commit('settleExp');
            this.commit('SAVE_GAME');          // 存档
            state.content = '喂食结束';
            setTimeout (function() {
              state.content = '阴公，好嗨饿！';
            },2000)
        },
        // 结束结算
        settleExp (state) {
            state.chick.egg.addEggExps = parseInt(state.currFood.exp/state.chick.egg.eggBase);
            let eggExps = state.chick.egg.progress += state.chick.egg.addEggExps;
            console.log("鸡蛋进度条增加后："+eggExps);
            let exps = state.chick.exp += state.currFood.exp;
            this.commit('settleLevel', exps);
            this.commit('settleEgg', eggExps);
        },
        // 升级计算
        settleLevel (state, exps) {
            // 判断是否需要升级
            if (exps >= state.chick.upgradeExp) {
              state.chick.level += 1;
              state.chick.exp = exps - state.chick.upgradeExp;
              state.chick.upgradeExp = parseInt(state.chick.upgradeExp * 2);
              state.modalLevel = true;
              this.commit('SAVE_GAME'); 
            }
        },
        // 生成鸡蛋个数计算
        settleEgg (state,eggExps) {
            if (eggExps > 100) {
              state.chick.egg.num = eggExps%100;
              state.chick.egg.progress = eggExps - state.chick.egg.num * state.chick.egg.eggBase;
            }
        },
        // 升级弹窗提示
        popupLevel (state) {
            let self = this;
            state.modalLevel = false;
            setTimeout (function() {
              self.commit('settleLevel', state.chick.exp);
            },500)
        },
        // 倒计时方法
        countdown (state, startdate) {
            let self = this;
            let es = state.endDate - startdate;
            let delay = Math.ceil(100/state.currFood.eatTime*1000); // 计算每秒走的进度
            if (es > 0) {
              let timer = setInterval (function() {
                let nowTime = new Date().getTime();
                let t = state.endDate - nowTime;
                let value = (state.currFood.eatTime - t)/1000 * delay; // 计算进度条
                if (value <= 100) {
                  state.value = value
                } else {
                  state.value = 100;
                }
                console.log("t:"+t+"进度条："+value+"%");
                if (t > 0) {
                  state.chick.eat = true;
                  let day = Math.floor(t/86400000);
                  let hour=Math.floor((t/3600000)%24);
                  let min=Math.floor((t/60000)%60);
                  let sec=Math.floor((t/1000)%60);
                  hour = hour < 10 ? "0" + hour : hour;
                  min = min < 10 ? "0" + min : min;
                  sec = sec < 10 ? "0" + sec : sec;
                  let format = '';
                  if (day > 0) {
                    format = `${day}天${hour}小时${min}分${sec}秒`;
                  } 
                  if (day <= 0 && hour > 0 ) {
                    format = `${hour}小时${min}分${sec}秒`; 
                  }
                  if (day <= 0 && hour <= 0) {
                    format =`${min}分${sec}秒`;
                  }
                  state.content = format; // 显示倒计时
                  self.commit('SAVE_GAME');
                } else {
                  clearInterval(timer); // 清除定时器
                  self.commit('endEat');
                }
              },1000)
            }
        },
        // 设置服装
        REPLACE_DRESS (state,price) {
          if (price.type == 0) {
            state.chick.currentSuit = price.pid;
            state.chick.currentClothes = price.pid;
            state.chick.currentHat = price.pid;
            state.chick.componentHat = 'hat-' + price.pid;
            state.chick.componentClothes = 'clothes-' + price.pid;
          } else if (price.type == 1) {
            state.chick.currentHat = price.pid;
            state.chick.componentHat = 'hat-' + price.pid;
          } else {
            state.chick.currentClothes = price.pid;
            state.chick.componentClothes = 'clothes-' + price.pid;
          }
        },
        // 存档
        SAVE_GAME (state) {
            let data = {
              endDate: state.endDate,
              currFood: state.currFood,
              chick: state.chick,
              user: state.user,
              foods: state.foods
            };
            console.log(data);
            localStorage.setItem('farmDate', JSON.stringify(data))
        },
          // 读档
        LOAD_GAME (state) {
            let data = JSON.parse(localStorage.getItem('farmDate'))
            if (!data) return
            state.endDate = data.endDate,
            state.currFood = data.currFood,
            state.chick = data.chick,
            state.user = data.user,
            state.foods = data.foods
        }
    },
    actions: {
      // 保存修改用户信息
      keepuser (context) {
        context.commit('SAVE_GAME');
      },
      endeat (context) {
        context.commit('END_EAT');
      },
      // 设置服装
      replacedress (context,value) {
        context.commit("REPLACE_DRESS",value);
        context.commit('SAVE_GAME');
      },
      // 购买商品
      shopsettle (context,value) {
        context.commit("SHOP_SETTLE",value);
        context.commit('SAVE_GAME');
      },
      // 解锁商品
      unlockfood (context,value) {
        context.commit("UNLOCK_FOOD",value);
        context.commit('SAVE_GAME');
      },
      // 读档
      loadgame (context) {
        context.commit('LOAD_GAME');
        // 判断是否进食
        context.commit('CHICK_IS_EAT');
      },
      // 存档
      savegame (context) {
        context.commit('SAVE_GAME');
      }
    }
})