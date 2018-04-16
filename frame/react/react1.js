class Component {
	setState(state) {
		let oldEl = this.ele;
		this.state = state

		this.mounted(oldEl, this.renderDOM())
	}

	renderDOM() {
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
class LikeButton extends Component {

	constructor () {
		super()
		this.state = {
			liked: true	
		};
	}

	onClick() {
		this.setState({
			liked: !this.state.liked
		})
	}

	render() {
		this.renderDOM()
	}
}
function string2dom(str) {
	let wrapper = document.createElement('div');
	wrapper.class="wrapper";
	wrapper.innerHTML = str;
	return wrapper;
}