import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Input from "../../../components/Input/Input";
import styles from './Login.style';
import Button from "../../../components/Button/Button";
import { Formik } from "formik";
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";


const initialFormValues = {
    usermail:'',
    password:'',
}

const validation = Yup.object().shape({
    usermail:Yup.string().email("E-Mail Formatına Uygun Girilmeli!").required("E-Mail Alanı Zorunludur!"),
    password: Yup.string().required("Şifre Alanı Zorunludur!").min(6, "Şifre En Az 6 Karakter Olmalıdır!"),
})

function Login({navigation}) {

    const [loading, setLoading] = useState(false);

    const goToRegisterPage = () => {
        navigation.navigate("RegisterPage")
    }

    async function handleFormSubmit(formValues) {
        useState(true);
        try {
            await auth().signInWithEmailAndPassword(
                formValues.usermail,
                formValues.password
            )
            setLoading(false);
        } catch (error) {
            showMessage({
                message:authErrorMessageParser(error.code),
                type:"danger"
            })
            console.log(error)
        }
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.header_container}>
                <Text style={styles.header}>codetalks</Text>
            </View>
            <Formik onSubmit={handleFormSubmit} initialValues={initialFormValues} validationSchema={validation}>
                {({values, handleChange, handleSubmit, handleBlur, errors, touched})=> (
                    <>
                    <View style={styles.input_container}>
                        <Input 
                            placeholder="e-postanızı giriniz..."
                            value={values.usermail}
                            onType={handleChange('usermail')}
                            onBlur={handleBlur("usermail")}
                        />
                        {touched.usermail && errors.usermail && <Text style={styles.error}>{errors.usermail}</Text>}
                        <Input 
                            placeholder="şifrenizi giriniz..."
                            value={values.password}
                            onType={handleChange('password')}
                            onBlur={handleBlur('password')}
                            isSecure
                        />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                    </View>
                    <View style={styles.button_container}>
                        <Button text="Giriş Yap" onPress={handleSubmit}/>
                        <Button text="Kayıt Ol" theme="secondary" onPress={goToRegisterPage}/>
                    </View>
                    </>
                )}
                
            </Formik>
        </ScrollView>
    )
}

export default Login;