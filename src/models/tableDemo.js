export default {

  namespace: 'tableDemo',

  state: {
    dataSource: [
      {
        name: '张一',
        age: 18,
        nativePlace: '上海',
        workNumber: '1000',
        workExperience: '3年',
      },
      {
        name: '张二',
        age: 18,
        nativePlace: '杭州',
        workNumber: '1001',
        workExperience: '4年',
      },
      {
        name: '张三',
        age: 18,
        nativePlace: '北京',
        workNumber: '1002',
        workExperience: '5年',
      },
      {
        name: '李一',
        age: 18,
        nativePlace: '上海',
        workNumber: '1003',
        workExperience: '3年',
      },
      {
        name: '李二',
        age: 18,
        nativePlace: '杭州',
        workNumber: '1004',
        workExperience: '4年',
      },
      {
        name: '李三',
        age: 18,
        nativePlace: '北京',
        workNumber: '1005',
        workExperience: '5年',
      },
    ],
    file:[
      {
        workNumber: '1000',
        fileList:[]
      },
      {
        workNumber: '1001',
        fileList:[]
      },
      {
        workNumber: '1002',
        fileList:[]
      },
      {
        workNumber: '1003',
        fileList:[]
      },
      {
        workNumber: '1004',
        fileList:[]
      },
      {
        workNumber: '1005',
        fileList:[]
      }
    ]
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
    *queryList({ payload }, { select }) {
      const dataSource = yield select(({ tableDemo }) => tableDemo.dataSource )
      const keys = Object.keys(payload);
      const values = Object.values(payload);
      let newDataSource;
      keys.forEach((item,index)=>{
        newDataSource= dataSource.filter(scroed=>scroed[item]===values[index])
      })
      return new Promise(resolve=>{
        if(JSON.stringify(payload)==='{}'){
          resolve(dataSource)
        }else{
          resolve(newDataSource)
        }
      })
    },
    *delete({ payload }, { put ,select }){
      const dataSource =yield select(({ tableDemo }) => tableDemo.dataSource )
      payload.forEach(item=>{
        dataSource.splice(dataSource.findIndex(value=>value.workNumber===item),1)
      })
      yield put({type: 'save', payload: { dataSource }})
    },
    *upload({ payload }, { put, select }){
      const file =yield select(({ tableDemo }) => tableDemo.file )
      file.splice(file.findIndex(item=>item.workNumber===payload.workNumber),1,payload)
      yield put ({type: 'save', payload: { file }})
    }
  },

  reducers: {
    save(state, {payload}) {
      return { ...state, ...payload };
    },
  },

};