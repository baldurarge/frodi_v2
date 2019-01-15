import { StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  borderTop:{
    borderTopColor: 'rgba(43,43,43,0.1)',
    borderTopWidth: 0.5
  },
  borderRight:{
    borderRightColor: 'rgba(43,43,43,0.1)',
    borderRightWidth: 0.5
  },
  borderLeft:{
    borderLeftColor: 'rgba(43,43,43,0.1)',
    borderLeftWidth: 0.5
  },
  borderBottom:{
    borderBottomColor: 'rgba(43,43,43,0.1)',
    borderBottomWidth: 0.5
  },
  navContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:15,
    ...ifIphoneX({
      paddingTop: 50
  }, {
      paddingTop: 20
  })
  },
  headline:{
    color:"#ffffff",
    fontWeight:"900",
    fontSize:26
  },
  containerColumn:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  containerRow:{
    flex: 1,
    flexDirection: 'row',
  },
  singleCurrency:{
    height:64,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgba(43,43,43,0.1)',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  singleCurrencyClicked: {
    backgroundColor:"rgba(81, 127, 164, 0.2)"
  },
  currencyText:{
    fontWeight:"300",
    fontSize:20
  },
  currencyValueContainer:{
    alignItems:'flex-end'
  },
  currencyValue:{
    fontWeight:"500",
    fontSize:20
  },
  currencyValueName:{
    fontWeight:"300",
    fontSize:14,
    color:'rgba(43,43,43,0.7)'
  },
  welcome: {
    fontSize: 20,
    color: 'orange'
  },
  numpadContainer:{
    height:270,
    flexDirection:"row",
    paddingTop:15,
    ...ifIphoneX({
        paddingBottom: 20
    })
  },
  numpadColumn:{
    flex:1
  },
  numpadNumber:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  numpadTopNumber:{
    paddingTop:10
  },
  numpadTopBar:{
    height:10,
    backgroundColor:"black"
  },
  modal1:{
    height:270,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: -4,
  }
});