import React from "react";
const ProfitContext = React.createContext({profit:{maxProfit: undefined, buyDate: undefined, sellDate: undefined}, setProfit: ()=> {}});

export default ProfitContext