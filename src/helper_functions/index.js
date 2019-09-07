
export function instantSearchFilter(s,arr){

  const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
  const re = RegExp(p,"i");
  
  let matched = arr.filter(v => v.name.match(re));

  let result = matched.map(function(val,index,arr){
            return val
  })

  return result


}



export function instantSearchFilterWorkflows(s,arr){

  const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
  const re = RegExp(p,"i");
  
  let matched = arr.filter(v => v.title.match(re));

  let result = matched.map(function(val,index,arr){
            return val
  })

  return result


}