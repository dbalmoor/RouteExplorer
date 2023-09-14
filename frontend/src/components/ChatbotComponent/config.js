import { createChatBotMessage } from 'react-chatbot-kit';
import LearningOptions from "./LinkList/LearningOptions/LearningOptions";
import BusNumbersList from './LinkList/BusNumbersList/BusNumbersList';
import BusRoutesList from './LinkList/BusRoutesList/BusRoutesList';
import ContinueExitList from './LinkList/ContinueExitList/ContinueExitList';
const botName = 'RouteExplorer';

const config = {
  initialMessages: [createChatBotMessage(`Hi! ${sessionStorage.getItem('email')}. I'm here to help you, in what area are you facing the issue?`, {
      widget: "learningOptions",
    })],
  widgets: [
     {
     	widgetName: "learningOptions",
    	widgetFunc: (props) => <LearningOptions {...props} />,
     },
     {
     	widgetName: "busNumbersList",
    	widgetFunc: (props) => <BusNumbersList {...props} />,
     },
     {
     	widgetName: "busRoutesList",
    	widgetFunc: (props) => <BusRoutesList {...props} />,
     },
     {
      widgetName: "continueExitList",
      widgetFunc: (props) => <ContinueExitList {...props} />,
     }
    
 ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: ' #123e5c',
      font: 'serif'
    },
    chatButton: {
      backgroundColor: '#123e5c',
    },
  },
  
};

export default config;