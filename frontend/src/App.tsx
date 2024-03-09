import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { firebaseConfig, vapidKey } from "./config";
import { initializeApp } from "firebase/app";
import { deleteToken, getMessaging, getToken } from "firebase/messaging";

initializeApp(firebaseConfig);
const messaging = getMessaging();

function App() {
  console.log(firebaseConfig);
  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        if ("serviceWorker" in navigator && "PushManager" in window) {
          const swReg = await navigator.serviceWorker.register(
            "../firebase-messaging-sw.js",
          );
          console.log("ServiceWorkerを登録しました", swReg);
        } else {
          console.log("すでにServiceWorkerが登録済みです");
        }
      } catch (err) {
        console.log(err);
      }
    };
    registerServiceWorker();
  }, []);

  const canPushNotification =
    "serviceWorker" in navigator && "PushManager" in window;

  // FCMからトークンを取得する
  const requestTokenToServer = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: vapidKey,
      });

      if (currentToken) {
        console.log("Current Token for client", currentToken);
      } else {
        console.log("No Token for client");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 通知許可を確認する
  const requestPermission = async () => {
    const registration = await navigator.serviceWorker.ready;
    if (!registration) {
      console.log("serviceWorkerが未登録です");
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("granted");
    } else {
      console.log("unable to get permission");
    }
  };

  // FCMから通知を削除する
  const deleteTokenFromFirebase = async () => {
    try {
      await getToken(messaging);
      await deleteToken(messaging);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <button onClick={requestTokenToServer}>トークン登録</button>
      <button onClick={requestPermission}>通知許可</button>
      <button onClick={deleteTokenFromFirebase}>トークン削除</button>
      {canPushNotification ? (
        <>
          <div>Push通知対応</div>
        </>
      ) : (
        <>Push通知非対応</>
      )}
    </div>
  );
}

export default App;
