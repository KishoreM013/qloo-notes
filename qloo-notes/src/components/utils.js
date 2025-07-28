export default function get_url_name(name) {

  let newName = name.toLowerCase(); 
  
  newName = newName.replace(' ', '-'); 
  
  return newName;
}
