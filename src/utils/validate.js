export const checkValidData = (isSignInForm, name, email, password) => {
   if (!isSignInForm){
      const isNameVaild = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
      if(!isNameVaild) return "Name is not Valid";
   }
   
   const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
   const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

   if(!isEmailValid) return "Email ID is not valid";
   if(!isPasswordValid) return "Password is not Valid";

   return null;
}