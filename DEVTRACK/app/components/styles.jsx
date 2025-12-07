import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#6E260E'
}, 
  camcontainer: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#6E260E'
}, 
camera: {
    flex: 1,
    width: '100%',
  },
 authcontainer: {
    backgroundColor: '#6E260E'
}, 
header1: {
  fontWeight: 'bold',
  fontSize: '50',
  textAlign: 'center',
  marginTop: '50%', 
  marginBottom: '30%',
  color: '#DAA06D'
},
header2: {
  fontWeight: 'bold',
  fontSize: '35',
  marginTop: '30%', 
  marginBottom: '15%',
  color: '#DAA06D',
  marginInlineStart: '25'
},
header3: {
  fontWeight: 'bold',
  fontSize: '35',
  marginTop: '15%', 
  marginBottom: '5%',
  color: '#DAA06D',
  marginInlineStart: '25'
},
button: {
    backgroundColor: "green", 
    padding: 10,
    borderRadius: 7,
    paddingVertical: 15, 
    marginTop:15,
    marginBottom: 15, 
    width: 250
},
buttontext :{
    fontWeight: 'bold', 
    color: 'white', 
    textAlign:'center', 
    fontSize: 17, 
    color:'#F2D2BD', 
    opacity:0.85
},
textbox:{
borderWidth: 2, 
borderColor: '#F2D2BD', 
padding: 12, 
borderRadius: 5, 
fontSize: 16,
backgroundColor: '#F2D2BD',
margin: 10, 
width: 300
},

  resultCard: {
    backgroundColor: '#DAA06D',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DAA06D',
  }
});

export default styles;

