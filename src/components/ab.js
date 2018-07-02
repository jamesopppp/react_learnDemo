class EventEmitter {
    constructor() {
        this._events = {}
    }

    on = (event, func) => {
        const events = this._events[event] || [];
        this._events[event] = events.push(func);
    }

    once = (event, func) => {
        var tmpFunc = () => {
            this.off(event, tmpFunc);
            func.apply(this, arguments);
        }
        this.on(event, tmpFunc);
    }

    off = (event, func) => {
        let funcList = this._events[event];
        if (!funcList) {
            return;
        }
        if (!func) {
            funcList = null;
            return;
        }
        const i = funcList.length;
        while (i--) {
            let item = funcList[i];
            if (item === func) {
                funcList.splice(i, 1);
                break;
            }
        }
    }

    fire = (event) => {
        let funcList = this._events[event];
        if (funcList) {
            const args = Array.prototype.slice.apply(arguments);
            args.shift();
            for (let i = 0; i < funcList.length; i += 1) {
                funcList[i].apply(this.arguments);
            }
        }
    }
}