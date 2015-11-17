import { util as _ } from 'vue'

export const directive = {
  bind() {
    this.preLoading = false
    this.tmp = {}
    this.firstBlood = false
    this.mouseOver = false
    this.handleMouseOver = (e) => {
      if (this.preLoading) {
        return
      }
      this.preLoading = true
      this.vm[this.expression].call(null, this, e)
    }
    this.handleMouseLeave = (e) => {
      this.mouseOver = false
      this.firstBlood = false
    }
    this.handleClick = (e) => {
      e.preventDefault()
      if (this.mouseOver && this.firstBlood) {
        return this.handleMouseOver(e)
      }
      this.firstBlood = true
      this.setState(this.tmp)
    }
    _.on(this.el, 'mouseover', this.handleMouseOver)
    _.on(this.el, 'mouseleave', this.handleMouseLeave)
    _.on(this.el, 'click', this.handleClick)
  },
  set(obj) {
    this.tmp = obj
  },
  setState(state) {
    for(const key in state) {
      this.vm.$set(key, state[key])
    }
  },
  end() {
    this.preLoading = false
    if (this.mouseOver) {
      this.setState(this.tmp)
    }
    this.mouseOver = true
  },
  reset() {
    _.off(this.el, 'mouseover', this.handleMouseOver)
    _.off(this.el, 'mouseleave', this.handleMouseLeave)
    _.off(this.el, 'click', this.handleClick)
  },
  unbind() {
    this.reset()
  }
}