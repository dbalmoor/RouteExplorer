// in ActionProvider.jsx
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you. In what area are you facing the issue?', {
      widget: "learningOptions",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleBusNumbers = () => {
    const botMessage = createChatBotMessage('You chose Bus Numbers, what category are you facing an issue in?', {
      widget: "busNumbersList",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleFetchNumbers = () => {
    const botMessage = createChatBotMessage('If you want to fetch routes of bus numbers, please go to home page, then search the sentence: - Do you want to know the Bus Routes? - and Click: - Get Started - ,Now enter the bus route number you want to fetch and Click: - Enter. Do you want to continue?',{
      widget: "continueExitList",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleFindNumbers = () => {
    const botMessage = createChatBotMessage('If you want to find bus numbers, please go to home page, then search the sentence: - Do you want to know the Bus Routes? - and Click: - Get Started - , Now Click `Know the Bus Routes` button at the top, You can scroll down and see all the bus routes. Do you want to continue?',{
      widget: "continueExitList",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleBusRoutes = () => {
    const botMessage = createChatBotMessage('You chose Bus Route, what category are you facing an issue in?', {
      widget: "busRoutesList",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleFetchRoutes = () => {
    const botMessage = createChatBotMessage('If you want to fetch Bus Routes, please go to home page, then search the sentence: - Are you looking for what bus to board? - and Click: - Get Started - ,Now enter the source and destination you want to fetch and Click: - Enter. Do you want to continue?',{
      widget: "continueExitList",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleFindRoutes = () => {
    const botMessage = createChatBotMessage('If you want to find all the locations, please go to home page, then search the sentence: - Are you looking for what bus to board? - and Click: - Get Started - , Now Click `Know Bus Locations` button,. Do you want to continue?',{
      widget: "continueExitList",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleContinue = () => {
    const botMessage = createChatBotMessage('In what area are you facing an issue?', {
      widget: "learningOptions",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleExit = () => {
    const botMessage = createChatBotMessage('Thank you for your time. Click the help option in NavBar to close the pop-up');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleContact = () => {
    const botMessage = createChatBotMessage('To get contact with us, Please click `Contact` button in the NavBar');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSignUp = () => {
    const botMessage = createChatBotMessage('To Sign-up click `SignUp` button in the NavBar, Fill in the Details and create Account. Do you want to Continue?',{
      widget: "continueExitList",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleLogin = () => {
    const botMessage = createChatBotMessage('To Log-in click `Login` button in the NavBar, Fill in the Details and Login. Do you want to Continue?',{
      widget: "continueExitList",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };


  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleBusNumbers,
            handleFetchNumbers,
            handleFindNumbers,
            handleBusRoutes,
            handleFetchRoutes,
            handleFindRoutes,
            handleContinue,
            handleExit,
            handleContact,
            handleLogin,
            handleSignUp,

          },
        });
      })}
    </div>
  );
};

export default ActionProvider;