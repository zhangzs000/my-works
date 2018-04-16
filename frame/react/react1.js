class LikeButton {

	constructor () {
		this.state = {
			liked: true	
		};
	}
	setState(state) {
		this.state.liked = state.liked
	}

	onClick() {
		let oldEl = this.ele;
		this.setState({
			liked: !this.state.liked
		})

		this.mounted(oldEl, this.render())
	}

	render() {
		this.ele = string2dom(`
			 <button class='like-btn'>
		        <span class='like-text'>${this.state.liked? '点赞': '取消'}</span>
		      </button>
			`)
		// 点击的时候this的指向是当前这个button。
		this.ele.addEventListener('click', this.onClick.bind(this))
		return this.ele;
	}
}
function string2dom(str) {
	let wrapper = document.createElement('div');
	wrapper.class="wrapper";
	wrapper.innerHTML = str;
	return wrapper;
}