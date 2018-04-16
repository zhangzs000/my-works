class LikeButton {

	constructor () {

	}

	render() {
		this.ele = string2dom(`
			 <button class='like-btn'>
		        <span class='like-text'>点赞</span>
		      </button>
			`)
		this.ele.addEventListener('click',()=>console.log(111))
		return this.ele;
	}
}
function string2dom(str) {
	let wrapper = document.createElement('div');
	wrapper.class="wrapper";
	wrapper.innerHTML = str;
	return wrapper;
}