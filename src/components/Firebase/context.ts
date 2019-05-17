import React from "react";
import firebase from "./firebase";

// Maybe change the argument to createContext as it may not be correct
const FirebaseContext = React.createContext<firebase.app.App>(firebase);

export default FirebaseContext;
