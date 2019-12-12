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
        },
        // 食物信息
        foods: [{
          id: 1,
          name: '小麦',    // 食物名称
          eatTime: 5000,    // 进食时间 (单位毫秒)
          exp: 100,       // 增加小鸡经验
          num: 2         // 库存数量
        },{
          id: 2,
          name: '香蕉',
          eatTime: 100000,
          exp: 500,
          num: 5
        }],
        startDate: '',    // 开始时间
        endDate: '',      // 结束时间
        content: '',      // 倒计时
        currFood: {},     // 当前选中的食物
        modalLecel: false,// 升级弹窗
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
        eat (state) {
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
                this.commit('save');
                state.content = '大佬，肚饥咧！';
                return;
            }
        },
        feedClick (state,index) {
            // 得到选中的食物
            // state.foods.forEach(obj => {
            //   if (obj.name === r) {
            //     state.currFood = obj
            //   }
            // })
            state.currFood = state.foods[index];
            console.log(state.currFood);
            if (state.chick.eat) {
              console.log("本鸡正在吃饭");
              return;
            } else if ( state.currFood.num > 0 ) {
              console.log("本鸡饿了，快给我吃的");
              let startDate = new Date().getTime();
              let endDate = startDate + state.currFood.eatTime;
              //state.startDate = startDate;
              state.endDate = endDate;
              state.currFood.num--;  // 扣除食物数量
              state.chick.eat = true;
              this.commit('save');
              this.commit('countdown', startDate);
            } else {
              console.log("你没有"+this.state.currFood.name+"食物了");
            }
        },
        // 进食结束
        endEat (state) {
            state.enddate = '';    // 倒计时结束清零结束时间
            state.chick.eat = false;     // 进食状态设为false
            // 经验值计算
            this.commit('settleExp');
            this.commit('save');          // 存档
            state.content = '喂食结束';
            setTimeout (function() {
              state.content = '阴公，好嗨饿！';
            },2000)
        },
        // 经验结算
        settleExp (state) {
            let exps = state.chick.exp += state.currFood.exp;
            console.log("exps:"+exps);
            this.commit('settleLevel', exps);
        },
        // 升级计算
        settleLevel (state, exps) {
            // 判断是否需要升级
            if (exps >= state.chick.upgradeExp) {
              state.chick.level += 1;
              state.chick.exp = exps - state.chick.upgradeExp;
              state.chick.upgradeExp = parseInt(state.chick.upgradeExp * 2);
              state.modalLecel = true;
              this.commit('save'); 
            }
        },
        // 升级弹窗提示
        popupLevel (state) {
            let self = this;
            state.modalLecel = false;
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
                  self.commit('save');
                } else {
                  clearInterval(timer); // 清除定时器
                  self.commit('endEat');
                }
              },1000)
            }
        },
        // 保存修改用户信息
        keepUser (state) {
          let self = this;
          console.log(state.user);
          self.commit('save');
        },
        // 设置套装
        setSuit (state,pid) {
          let self = this;
          state.chick.currentSuit = pid;
          state.chick.currentClothes = pid;
          state.chick.currentHat = pid;
          state.chick.componentHat = 'hat-' + pid;
          state.chick.componentClothes = 'clothes-' + pid;
          self.commit('save');
        },
        // 设置帽子
        setHat (state,pid) {
          let self = this;
          state.chick.currentHat = pid;
          state.chick.componentHat = 'hat-' + pid;
          self.commit('save');
        },
        // 设置衣服
        setClothes (state,pid) {
          let self = this;
          state.chick.currentClothes = pid;
          state.chick.componentClothes = 'clothes-' + pid;
          self.commit('save');
        },
        // 存档
        save (state) {
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
        load (state) {
            let data = JSON.parse(localStorage.getItem('farmDate'))
            if (!data) return
            state.endDate = data.endDate,
            state.currFood = data.currFood,
            state.chick = data.chick,
            state.user = data.user,
            state.foods = data.foods
        }
    }
})