import Store from './Store'
import Input from './Input'
import { create } from 'mobx-persist'
import Input1 from './Input1'
import Input2 from './Input2'
import Output from './Output'


// const hydrate = create()

const stores = {
	Store,
	Input1,
	Input2,
	Output
}

// Promise.all([
// 	hydrate('Input1', stores.Input1),
// 	hydrate('Input2', stores.Input2),
// 	hydrate('Output', stores.Output),
// ]).then(() => {
// })



export default {
	...stores
}