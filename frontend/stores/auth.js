import { defineStore } from 'pinia';
import { loginAPI } from '@/repositories/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref({
        loggedIn: false,
        token: '',
    });

    const isLoggingIn = ref(false);
    const userError = ref('');

    const token = computed(() => user.value.token);
    const canEdit = computed(() => user.value.loggedIn)

    // async function login(username, password) {
    //     isLoggingIn.value = true;


    //     const { data: response, error, status } = await loginAPI(username, password);
    //     if (status.value == 'error') {
    //         useCustomError(error.value, (error) => {
    //             userError.value = error.data.error;
    //         });
    //     }

    //     user.value = {
    //         loggedIn: true,
    //         token: response.value.token,
    //     };

    //     const token = useCookie('token');

    //     token.value = response.value.token;

    //     isLoggingIn.value = false;
    //     userError.value = '';

    //     return true;
    // }

    async function login(username, password) {
        isLoggingIn.value = true;
    
        const { data: response, error, status } = await loginAPI(username, password);
        if (status.value === 'error') {
            useCustomError(error.value, (error) => {
                userError.value = error.data.error;
            });
            isLoggingIn.value = false;
            return false;
        }
    
        if (response && response.value && response.value.token) {
            user.value = {
                loggedIn: true,
                token: response.value.token,
            };
    
            const token = useCookie('token');
            token.value = response.value.token;
    
            userError.value = '';
            isLoggingIn.value = false;
    
            return true; // คืนค่า true เมื่อ login สำเร็จ
        } else {
            userError.value = 'Login failed. No token received.';
            isLoggingIn.value = false;
            return false; // คืนค่า false เมื่อไม่มี token
        }
    }

    async function setUser(token) {
        user.value = {
            loggedIn: true,
            token,
        }
    }

    return {
        user,
        token,
        canEdit,
        userError,
        login,
        setUser,
    }
})