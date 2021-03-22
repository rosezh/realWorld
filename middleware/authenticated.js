// 处理权限访问
export default function({store, redirect}){
  // if the user is not authenticated
  if(!store.state.user){
    return redirect('/login')
  }
}