class Code {
    static get toolbox() {
        return {
            title: 'Kod Bloğu',
            icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 8.914l-5.303-5.303-1.414 1.414 6.364 6.364h-4.646v1.414h4.646l-6.364 6.364 1.414 1.414 5.303-5.303v4.949h1.414v-4.949l5.303 5.303 1.414-1.414-6.364-6.364h4.646v-1.414h-4.646l6.364-6.364-1.414-1.414-5.303 5.303v-4.949h-1.414v4.949z"/></svg>'
        }
    }

    constructor({ data, config, api }) {
        this.data    = data
        this.wrapper = undefined
        this.api     = api
        this.config  = {
            readOnly: config.readOnly || false
        }
    }

    static get isReadOnlySupported() {
        return true
    }

    render() {
        this.wrapper = document.createElement('div')
        this.wrapper.classList.add('code_area')

        const pre = document.createElement('pre')
        const code = document.createElement('code')

        code.textContent = this.data.code

        pre.appendChild(code)
        this.wrapper.appendChild(pre)
  
        return this.wrapper
    }

    save() {
        return {
            code: this.wrapper.querySelector('code').textContent
        }
    }
}


export default Code