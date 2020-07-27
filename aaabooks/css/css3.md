### transform

* 绕y轴旋转

```

    width: 100px;
    height: 100px;
    background-color: #f00;
    transform: rotateY(30deg);


```

* 鼠标滑过无限旋转

```
过渡 transform 没法无限循环，待用animation

transform: rotate(666deg);
/* transition-delay: 0s;
transition-property: all;
transition-duration: 1s;
transition-timing-function: cubic-bezier(.34,0,.84,1); */
/* transition: transform 1s cubic-bezier(.34,0,.84,1) 0s; */
transition: all 1s cubic-bezier(.34,0,.84,1) 0s;

```

```
animation:mymove 1s linear 0s infinite;
/* animation: name duration timing-function delay iteration-count direction fill-mode play-state; */

@keyframes mymove{  
		from{  
				transform:rotate(0deg);  
		}  
		to{  
				transform:rotate(360deg);  
		}  
} 
```

....

#### 试题-项目驱动，题海战术

实现一个正方形

* x,y,z轴的偏移量可以是2D也可以是3D;
 
   * 2D: translate(x, y) / translateX(n) / translateY(n)
   * 3D: translate3d(x,y,z) / translateX(x) / ...

* 绕轴旋转+转换
 
   * transform: translateY(150px) rotateX(90deg);
   * transform: translate3d(50px, -50px, 0) rotate3d(1, 0, 0, 90deg);

```

<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		* {
			padding: 0;
			margin: 0;
		}
		#stage {
			perspective:1000px;
			width: 400px;
			height: 400px;
			background-color: #ccc;
		}
		ul {
			list-style: none;
			position: relative;
			left: 50px;
			top: 50px;
			width: 200px;
			height: 200px;
			background: #000;
			transform-style:preserve-3d;
			transition: all 60s ease-in-out;
		}
		ul:hover {
			transform: rotateX(99999deg);
		}
		li {
			position: absolute;
			left: -50px;
			top: -50px;
			width: 200px;
			height: 200px;
		}
		#d1 {
			background-color: #f00;
			transform: translate3d(50px, -50px, 0) rotate3d(1, 0, 0, 90deg);
			/*transform: translate(50px, -100px);*/
			/*transform: rotateX(90deg);*/
		}
		#d2 {
			background-color: #0f0;
			transform: translate3d(150px, 50px, 0) rotate3d(0, 1, 0, 90deg);
			/*transform: translate(150px, 50px);*/
			/*transform: rotateY(90deg);*/
		}
		#d3 {
			background-color:  #00f;
			transform: translate3d(50px, 150px, 0) rotate3d(1, 0, 0, 90deg);
		}
		#d4 {
			background-color:  #112233;
			transform: translate3d(-50px, 50px, 0) rotate3d(0, 1, 0, 90deg);
		}
		#d5 {
			background-color:  #f90;
			transform: translate3d(50px, 50px, -100px);
		}
		#d6 {
			background-color:  #9f0;
			transform: translate3d(50px, 50px, 100px);
		}
	</style>
</head>
<body>
	<div id="stage">
		<ul>
			<li id="d1">01</li>
			<li id="d2">02</li>
			<li id="d3">03</li>
			<li id="d4">04</li>
			<li id="d5">05</li>
			<li id="d6">06</li>
		</ul>
	</div>
</body>

```