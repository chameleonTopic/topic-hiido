import loadJs from './loadJs'

declare global {
    interface Window { 
        HiidoEvent?: any
        'topic-hiido': typeof TopicHdEvent
        TopicHiddoEvent: typeof TopicHdEvent
    }
}

const defaultConfig = {
    sdkUrl: '//cdn.hiido.com/sdk/websdk.js',
}

function TopicHdEvent(config: any) {
    this.config = {
        ...defaultConfig,
        ...config
    }
    this.isInit = false
    this.pendingReportEventOptQueue = []
    this._report = function (option: any) {
        if (window.HiidoEvent === undefined) {
            console.error('You may have used it before initialization, please use the [report] method to call instead of [_report] method. eg: topicHdEvent._report(option)')
            return
        }

        const _config = this.config || {}
        const _option = option || {}
        const prodid = _option.prodid || _config.prodid || ''
        const eventid = _option.eventid || _config.eventid || ''
        const hdOptions = _option.hdOptions || _config.hdOptions || {}
        const hdevent = new window.HiidoEvent(prodid, eventid, hdOptions)

        hdevent.setActtype(_option.actType || '')
        if (_option.moreinfo) hdevent.setMoreinfo(_option.moreinfo)
        if (typeof _config.beforeReport === "function") _config.beforeReport(hdevent)
        if (typeof _option.beforeReport === "function") _option.beforeReport(hdevent)

        hdevent.reportJudge()
    }
}

TopicHdEvent.prototype.report = function (option: any) {
    this.isInit ? this._report(option) : this.pendingReportEventOptQueue.push(option)
}

TopicHdEvent.prototype.init = function () {
    if (this.isInit) return
    const that = this
    const sdkUrl = this.config.sdkUrl
    loadJs(sdkUrl, function () {
        that.isInit = true
        while (that.pendingReportEventOptQueue.length > 0) {
            that._report(that.pendingReportEventOptQueue.shift())
        }
    })
}

if(window !== undefined && window['topic-hiido']) {
    window.TopicHiddoEvent =  TopicHdEvent
}


export default TopicHdEvent