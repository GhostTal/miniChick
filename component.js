// 组件
// 默认衣服
Vue.component('clothes-default', {
	template: `<div></div>`
});
// 默认帽子
Vue.component('hat-default', {
	template: `<div></div>`
});
// 青蛙衣服
Vue.component('clothes-forg', {
	template: `
		<div class="jacket-frog">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	`
});
// 青蛙帽子
Vue.component('hat-forg', {
	template: `
		<div class="hat-frog">
			<span class="hat-frog-eye el"></span>
			<span class="hat-frog-eye er"></span>
			<span class="sun-cured"></span>
		</div>
	`
});

// 太阳光
Vue.component('c-sunlight', {
	template: `
		<div class="sunlight" title="太阳光">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	`
});

// 山峰-风车
Vue.component('c-peak', {
	template: `
		<div class="peak-box" title="山峰风车">
			<div class="peak-1"></div>
			<div class="peak-2"></div>
			<div class="peak-3"></div>
			<div class="peak-4"></div>
			<div class="peak-5"></div>
			<div class="peak-6"></div>
			<div class="peak-7">
				<div class="peak-7-1"></div>
				<div class="peak-7-2"></div>
			</div>
			<div class="peak-8"></div>
			<div class="peak-9"></div>
			<div class="windmill">
				<div class="windmill-1"></div>
				<div class="windmill-2"></div>
				<div class="windmill-3"></div>
				<div class="windmill-4"></div>
				<div class="windmill-5">
					<div class="windmill-5-1"></div>
					<div class="windmill-5-2"></div>
				</div>
			</div>
		</div>
	`
});

// 白云
Vue.component('c-clouds', {
	template: `
		<div class="clouds" title="白云">
		  	<div class="cloud x1"></div>
		  	<div class="cloud x2"></div>
		  	<div class="cloud x3"></div>
		</div> 
	`
});

// 鸡饭碗
Vue.component('c-trough', {
	props: ['troughTitle'],
	template: `
		<div class="trough" title="鸡饭碗">
			<span></span>
			<span></span>
			<div class="fodder"></div>
			<div class="trough-l">
				<p></p>
				<p></p>
				<p></p>
			</div>
			<div>{{troughTitle}}</div>
		</div>
	`
});

// 叶子
Vue.component('c-leaf', {
	template: `
		<div class="leaf-box" title="叶子">
			<div class="leaf-item leaf-1"></div>
			<div class="leaf-item leaf-2"></div>
			<div class="leaf-item leaf-3"></div>
			<div class="leaf-item leaf-4"></div>
		</div>
	`
});

// 蜜蜂鲜花
Vue.component('c-bee', {
	template: `
		<div class="bee-box" title="蜜蜂鲜花">
			<div class="soil two"></div>
			<div class="soil"></div>
			<div class="flowerpot">
				<div class="flowerpot-top"></div>
				<div class="flowerpot-bottom"></div>
			</div>
			<div class="flower">
				<div class="flower-top">
					<p></p>
					<p></p>
					<p></p>
					<p></p>
				</div>
				<div class="flower-head"></div>
			</div>
			<div class="bee">
				<div class="bee-body"></div>
			</div>
			<div class="bee bee-2">
				<div class="bee-body"></div>
			</div>
			<div class="triangle-box two">
				<div class="item"></div>
				<div class="item"></div>
				<div class="item"></div>
			</div>
		</div>
	`
});

// 鸡蛋
Vue.component('c-egg', {
	template: `
		<div class="egg-wrapper" title="鸡蛋">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<div class="egg infinite">
				<div class="heart"></div>
			</div>
		</div>
	`
});

// 草地
Vue.component('c-grass', {
	template: `
		<div class="grass-1" title="草">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<div class="triangle-box">
				<div class="item"></div> 
				<div class="item"></div> 
				<div class="item"></div> 
				<div class="item"></div>
			</div>
		</div>
	`
});

// 房子
Vue.component('c-house', {
	template: `
		<div class="house" title="房子">
			<div class="house-1"></div>
			<div class="house-2-1"></div>
			<div class="house-2-2"></div>
			<div class="house-2"></div>
			<div class="house-3-1"></div>
			<div class="house-3-2"></div>
			<div class="house-3"></div>
			<div class="house-4"></div>
			<div class="house-5"></div>
			<div class="house-6"></div>
			<div class="house-7"></div>
			<div class="house-8"></div>
			<div class="house-9"></div>
		</div>
	`
});

// 护栏
Vue.component('c-fence', {
	template: `
		<div class="fence" title="护栏">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	`
});


