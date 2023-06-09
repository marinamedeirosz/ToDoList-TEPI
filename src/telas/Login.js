import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import CaixaTexto from '../componentes/MyTextInput';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home')
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputView}>
                <CaixaTexto
                    autoCapitalize="none"
                    placeholderTextColor="#727272"
                    placeholder='email'
                    value={email}
                    onChangeText={setEmail} />
                <CaixaTexto
                    autoCapitalize="none"
                    placeholderTextColor="#727272"
                    placeholder='senha'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword} />
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.botao} onPress={(handleLogin)}>
                    <Text style={styles.botaoText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botao, styles.botaoOutline]} onPress={handleSignUp}>
                    <Text style={styles.botaoOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        marginTop: 40
    },
    botao: {
        width: '100%',
        backgroundColor: '#575c5e',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    botaoOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#575c5e',
        borderWidth: 2
    },
    botaoText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    botaoOutlineText: {
        color: '#575c5e',
        fontWeight: '700',
        fontSize: 16
    }
})
