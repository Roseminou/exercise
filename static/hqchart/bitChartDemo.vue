<template>
    <div>
        <div id="kline" style="width: 900px;height:400px;position: relative;"></div>
    </div>
</template>
<script>
import Axios from 'axios'

export default {
    mounted() {
        //简单的把K线控件封装下
        function KLineChart(divKLine)
        {
            this.DivKLine=divKLine;
            this.Chart=JSChart.Init(divKLine);   //把K线图绑定到一个Div上
            var self=this;
            //K线配置信息
            this.Option= {
                Type:'历史K线图',   //创建图形类型
                
                Windows: //窗口指标
                [
                    {Index:"MA", Modify:false,Change:false},
                    {Index:"VOL", Modify:false,Change:false}, 
                ], 

                
                Symbol:'BTCUSDT.BIT',
                //Symbol:'600000.sh',
                IsAutoUpdate:true,          //是自动更新数据
                AutoUpdateFrequency:5000,   //数据更新频率
    
                IsShowRightMenu:true,          //右键菜单
                IsShowCorssCursorInfo:true,    //是否显示十字光标的刻度信息
                //CorssCursorTouchEnd:true,
    
                KLine:  //K线设置
                {
                    DragMode:1,                 //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
                    Right:0,                    //复权 0 不复权 1 前复权 2 后复权
                    Period:4,                   //周期 0 日线 1 周线 2 月线 3 年线 
                    MaxReqeustDataCount:1000,   //数据个数
                    MaxRequestMinuteDayCount:10, //分钟数据取5天
                    PageSize:50,               //一屏显示多少数据
                    //Info:["互动易","大宗交易",'龙虎榜',"调研","业绩预告","公告"],       //信息地雷
                    IsShowTooltip:true,                 //是否显示K线提示信息
                },
    
                KLineTitle: //标题设置
                {
                    IsShowName:true,       //不显示股票名称
                    IsShowSettingInfo:true //不显示周期/复权
                },

                NetworkFilter:function(data, callback) { self.NetworkFilter(data, callback); } ,   //绑定网络协议回调
    
                Border: //边框
                {
                    Left:5,         //左边间距
                    Right:70,       //右边间距
                    Bottom:25,      //底部间距
                    Top:25          //顶部间距
                },
                
                Frame:  //子框架设置    垂直方向刻度数量
                [
                    {SplitCount:6,StringFormat:0, IsShowLeftText:false},
                    {SplitCount:4,StringFormat:0, IsShowLeftText:false},
                ],

                ExtendChart:    //扩展图形
                [
                    {Name:'KLineTooltip' }  //手机端tooltip
                ],
            };
                 
            this.Create=function()  //创建图形
            {
                var self=this;
                $(window).resize(function() { self.OnSize(); });    //绑定窗口大小变化事件

                //var blackStyle=HQChartStyle.GetStyleConfig(STYLE_TYPE_ID.BLACK_ID); //读取黑色风格配置
                //JSChart.SetStyle(blackStyle);
                //this.DivKLine.style.backgroundColor=blackStyle.BGColor; //设置最外面的div背景

                this.OnSize();  //让K线全屏
                this.Chart.SetOption(this.Option);  //设置K线配置
            }


            this.OnSize=function()  //自适应大小调整
            {
                var height= $(window).height();
                var width = $(window).width();
                this.DivKLine.style.top='px';
                this.DivKLine.style.left='px';
                this.DivKLine.style.width=width+'px';
                this.DivKLine.style.height=height+'px';
                this.Chart.OnSize();
            }

            this.NetworkFilter=function(data, callback)
            {
                console.log('[NetworkFilter] data', data);

                switch(data)
                {
                    case 'KLineChartContainer::ReqeustHistoryMinuteData':   //1分钟全量数据下载
                        this.RequestHistoryMinuteData(callback);
                        break;
                    case 'KLineChartContainer::RequestMinuteRealtimeData':  //1分钟增量数据更新
                        this.RequestMinuteRealtimeData(callback);
                        break;
                    case 'KLineChartContainer::RequestHistoryData':     //日线全量数据下载
                        this.RequestHistoryData(callback);
                        break;
                    case 'KLineChartContainer::RequestRealtimeData':    //日线增量数据更新
                        this.RequestRealtimeData(callback);
                        break;
                }
            }

            this.RequestHistoryMinuteData=function(callback)
            {
                var self=this;

                Axios.get('https://sandboxnews.bixin.com/api/v1/bar', {params: {"symbol": "BTC/USDT","period": "1m", limit: 200}}).then(res => {
                    console.log('RequestHistoryMinuteData res111', res);
                    
                    let data = self.RecvHistoryMinuteData(res.data.data); 
                    callback(data)

                }).catch(err => {
                    console.log('RequestHistoryMinuteData err', err);
                    
                })
               
            }

            this.RecvHistoryMinuteData=function(data)
            {
                
                var hqChartData={
                    code:0, 
                    symbol:"BTC/USDT",
                    data:[]
                };

                var yClose=null;
                for(var i=data.length-1; i>=0; --i)
                {
                    var item=data[i];
                    var timestamp = item.time;
                    var dateTime = new Date();
                    dateTime.setTime(timestamp * 1000);

                    var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
                    var time=dateTime.getHours()*100+dateTime.getMinutes();
                    // var newItem=[date,yClose, item.open, item.high, item.low, item.close, item.vol, item.amount, time];
                    var newItem=[Number(date),Number(yClose), Number(item.open), Number(item.high), Number(item.low), Number(item.close), Number(item.volume), Number(item.volume)];
                    
                    yClose=item.close;
                    hqChartData.data.push(newItem);
                }

                return hqChartData;
            }

            this.RequestMinuteRealtimeData=function(callback)
            {
                var self=this;

                    Axios.get('https://sandboxnews.bixin.com/api/v1/bar', {params: {"symbol": "BTC/USDT","period": "1m", limit: 1}}).then(res => {
                        console.log('RequestMinuteRealtimeData res111', res);
                        
                        let data = self.RecvMinuteRealtimeData(res.data.data)

                        callback(data)

                    }).catch(err => {
                        console.log('RequestMinuteRealtimeData err', err);
                        
                    })
            }

            this.RecvMinuteRealtimeData=function(data)
            {

                var hqChartData={
                    code:0, 
                    symbol:"BTC/USDT",
                    data:[]
                };

                var item=data[0];
                var timestamp = item.time;
                var dateTime = new Date();
                dateTime.setTime(timestamp * 1000);

                var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
                var time=dateTime.getHours()*100+dateTime.getMinutes();

                hqChartData.data.date=date;
                hqChartData.data.time=time;
                hqChartData.data.open=Number(item.open);
                hqChartData.data.high=Number(item.high);
                hqChartData.data.low=Number(item.low);
                hqChartData.data.price=Number(item.close);
                hqChartData.data.vol=Number(item.volume);
                hqChartData.data.amount=Number(item.volume);



                // callback(hqChartData);
                return hqChartData
            }

            this.RequestHistoryData=function(callback)
            {
                console.log('RequestHistoryData获取数据');
                
                var self=this;

                Axios.get('https://sandboxnews.bixin.com/api/v1/bar', {params: {"symbol": "BTC/USDT","period": "1d", limit: 200}}).then(res => {
                    console.log('RequestHistoryData res111', res);
                    let data = self.RecvHistoryData(res.data.data);
                    callback(data)
                }).catch(err => {
                    console.log('RequestHistoryData err', err);
                    
                })
            }

            this.RecvHistoryData=function(data)
            {
                
                var hqChartData={
                    code:0, 
                    symbol:"BTC/USDT",
                    data:[]
                };


                var yClose=null;
                for(var i=data.length-1; i>=0; --i)
                {
                    var item=data[i];
                    // var timestamp = item.id;
                    var timestamp = item.time;
                    var dateTime = new Date();
                    dateTime.setTime(timestamp * 1000);

                    var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
                    var time=dateTime.getHours()*100+dateTime.getMinutes();
                    // var newItem=[date,yClose, item.open, item.high, item.low, item.close, item.vol, item.amount];
                    var newItem=[Number(date),Number(yClose), Number(item.open), Number(item.high), Number(item.low), Number(item.close), Number(item.volume), Number(item.volume)];
                    

                    yClose=item.close;
                    hqChartData.data.push(newItem);
                }

                return hqChartData;

            }

            this.RequestRealtimeData=function(callback)
            {
                var self=this;

                    Axios.get('https://sandboxnews.bixin.com/api/v1/bar', {params: {"symbol": "BTC/USDT", "period": "1d", limit: 1}}).then(res => {
                        console.log('RequestRealtimeData res111', res);
                        
                        let data = self.RecvRealtimeData(res.data.data); 
                        callback(data)

                    }).catch(err => {
                        console.log('RequestRealtimeData err', err);
                        
                    })
            }

            this.RecvRealtimeData=function(data)
            {
                var hqChartData={
                    code:0, 
                    symbol:"BTC/USDT",
                    data:[]
                };

                var item=data[0];
                var timestamp = item.time;
                var dateTime = new Date();
                dateTime.setTime(timestamp * 1000);

                var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
                var time=dateTime.getHours()*100+dateTime.getMinutes();

                hqChartData.data.date=date;
                hqChartData.data.time=time;
                hqChartData.data.open=Number(item.open);
                hqChartData.data.high=Number(item.high);
                hqChartData.data.low=Number(item.low);
                hqChartData.data.price=Number(item.close);
                hqChartData.data.vol=Number(item.volume);
                hqChartData.data.amount=Number(item.volume);

                // callback(hqChartData);
                return hqChartData
            }
        }

        $(function () 
        {
            WebFont.load({ custom: { families: ['iconfont'] } });   //预加载下iconfont资源
            var klineControl=new KLineChart(document.getElementById('kline'));
            klineControl.Create();
        })
    },
}
</script>