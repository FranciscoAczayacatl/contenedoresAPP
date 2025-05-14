import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:'flex',
    alignItems:'center',
  },
  containTable: {
    width: width * 0.95,
    height: height * 0.25,
    overflow: 'hidden',
    borderRadius: 20,
    marginTop: width * 0.05,
  },
  title: {
    color: 'black',
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    padding: 0,
    margin: 0,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  summaryRow: {
    width: width * 0.9,
    flexDirection: 'row',
    borderRadius: 20,
    gap: 3,
    marginTop: 5,
    marginLeft: width * 0.04,
    textAlign:'center',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  summaryCell: {
    width: width * 0.25,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  summaryText: {
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  selectedRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#a0e3b2',
  },
  selectedCell: {
    backgroundColor: '#a0e3b2',
  },
  secondTable: {
    width: width * 0.95,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginTop: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  staticTable: {
    marginTop: 20,
    width: width * 0.95,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
  },
  scrollArea: {
    maxHeight: 200, // ajusta según tu diseño
  },
  button: {
    backgroundColor: '#e09f3e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsContainer:{
    width: width * 1,
    height: height * 0.06,
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
  buttonsDisable:{
    height: height * 0.06,
    width: width * 0.15 ,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#495057',
    borderRadius:10,
  },
  icons:{
    width: width * 0.05 ,
    height: height * 0.03 ,
  },
  buttonadd:{
    height: height * 0.06,
    width: width * 0.15 ,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2a9d8f',
    borderRadius:10,
  },
  buttonedit:{
    height: height * 0.06,
    width: width * 0.15 ,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f4a261',
    borderRadius:10,
  },
  buttonsave:{
    height: height * 0.06,
    width: width * 0.15 ,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#a7c957',
    borderRadius:10,
  },
  buttondeleted:{
    height: height * 0.06,
    width: width * 0.15 ,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e63946',
    borderRadius:10,
  },
   containerr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenInput: {
    height: 0,
    width: 0,  // Hacerlo invisible
    position: 'absolute',  // No ocupar espacio
  },
  scannedText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});
