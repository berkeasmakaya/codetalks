import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Input from "../../../components/Input/Input";
import styles from './Register.style';
import Button from "../../../components/Button/Button";
import { Formik } from "formik";
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";

const initialFormValues = {
    usermail:'',
    password:'',
    repassword:'',
}

const validation = Yup.object().shape({
    usermail: Yup.string().email("E-Mail Formatına Uygun Girilmeli!").required("E-Mail Alanı Zorunludur!"),
    password: Yup.string().required("Şifre Alanı Zorunludur!").min(6, "Şifre En Az 6 Karakter Olmalıdır!"),
    repassword: Yup.string().oneOf([Yup.ref('password')], "Şifreler Aynı Olmalıdır!").required("Şifre Onayı Zorunludur!")
})

function Register({navigation}) {

    const [loading, setLoading] = useState(false)

    const goBack = () => {
        navigation.goBack();
    }

    async function handleFormSubmit(formValues) {
        try {
            setLoading(true);
            await auth().createUserWithEmailAndPassword(
                formValues.usermail,
                formValues.password
            )
            showMessage({
                message:"Kullanıcı Başarıyla Oluşturuldu.",
                type:"success"
            })
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
            <Formik onSubmit={(values, {resetForm})=>{
                handleFormSubmit(values);
                resetForm();
            }} initialValues={initialFormValues} validationSchema={validation}>
                {({values, handleChange, handleSubmit, handleBlur, touched, errors})=>(
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
                            onBlur={handleBlur("password")}
                            isSecure
                        />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                        <Input 
                            placeholder="şifrenizi tekrar giriniz..."
                            value={values.repassword}
                            onType={handleChange('repassword')}
                            onBlur={handleBlur("repassword")}
                            isSecure
                        />
                        {touched.repassword && errors.repassword && <Text style={styles.error}>{errors.repassword}</Text>}
                    </View>
                    <View style={styles.button_container}>
                        <Button text="Kayıt Ol" onPress={handleSubmit} loading={loading}/>
                        <Button text="Geri" theme="secondary" onPress={goBack}/>
                    </View>
                    </>
                )}
            </Formik>
            
        </ScrollView>
    )
}

export default Register;