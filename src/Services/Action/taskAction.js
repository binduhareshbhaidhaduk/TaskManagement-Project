import { getDocs, collection, addDoc } from 'firebase/firestore';
import { auth, db, provider } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const signUpSuc = (user) => {
  return {
    type: 'SIGNUP_SUC',
    payload: user
  }
}

export const loginSuc = (user) => ({
  type: 'LOGIN_SUC',
  payload: user,
});

export const SignOutSuc=()=>{
  return {
    type:'SIGNOUT',
  }
}

export const googleLogInSuc = (user) => {
  return {
    type: 'GOOGLE_LOGIN_SUC',
    payload: user
  }
}


export const viewTaskSuc = (tasks) => ({
  type: 'VIEW_TASK_SUC',
  payload: tasks,
});



export const readTasks = () => {
  return async (dispatch) => {
    try {
      const tasks = [];
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      dispatch(viewTaskSuc(tasks));
      console.log(tasks, 'tady');
    } catch (error) {
      console.error('Error in readTask: ', error);
    }
  };
};



export const signUp = (email, password) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(signUpSuc(user))
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, 'errorcode', errorMessage, 'err messsage')
      });

  }
}
export const SignOut =()=>{
  return (dispatch) => {
    signOut(auth)
    .then(() => {
      dispatch(SignOutSuc())
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, 'errorcode', errorMessage, 'err messsage')
        });
      }
}

export const Login = (email, password) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(loginSuc(user)); // Dispatch success action
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login failed:', errorCode, errorMessage);
      });
  };
};


export const googleLogIn = () => {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        const user = result.user;
        dispatch(googleLogInSuc(user))
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, 'errorcode', errorMessage, 'err messsage')
      });
  }
}


export const sendMessage = (taskId, message) => async (dispatch) => {
  try {
    await addDoc(collection(db, 'messages'), {
      taskId,
      message,
    });
    // You can dispatch an action to update the state if needed
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export const addContactMessage = (formData) => async (dispatch) => {
  try {
    await addDoc(collection(db, 'contactMessages'), {
      email: formData.email,
      name: formData.name,
      message: formData.message,
      timestamp: new Date(),
    });
    dispatch({ type: 'CONTACT_MESSAGE_SUCCESS' });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    dispatch({ type: 'CONTACT_MESSAGE_ERROR', payload: error });
  }
};