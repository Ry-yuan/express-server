const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name:String,
  age:Number,
  sex:String,
  password:String
});
// static方法添加模型静态方法
// methods方法添加实例方法 
userSchema.statics.showName = function(name){
  console.log(name);  
};
let User = mongoose.model('user',userSchema);

module.exports = User;
