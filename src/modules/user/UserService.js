import {reactive, ref} from "vue";
import {api} from "@/api/api.js";
import router from "@/router/index.js";

export const user = ref({});
export const isUserLoading = ref(false);
export const id = ref(null);
export const token = ref(null);

export async function getUser() {
    if (!id.value) {
        return this;
    }

    try {
        isUserLoading.value = true;
        const response = await api.get(`/user/${id.value}`);
       
        userStore(response.data.data);
        userProcess();
        isUserLoading.value = false;
    } catch (err) {
        console.error(err);
        isUserLoading.value = false;
    }
}

export let changePasswordForm = reactive({
    old_password: '',
    password: '',
    password_confirmation: '',
})

export let validChangePasswordForm = ref(false)

export function userProcess() {
    token.value = localStorage.getItem("token");
    user.value = JSON.parse(localStorage.getItem("user"));
    id.value = JSON.parse(localStorage.getItem("id"));
    
}

export function userStore(user, token = null) {
    if (token) {
        localStorage.setItem('token', token);
    }
    localStorage.setItem('id', user.id);
    localStorage.setItem('user', JSON.stringify(user));
}

export function dropUser() {
    token.value = null;
    user.value = null;
    id.value = null;
    
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
}

export const userLogout = async () => {
  try{
    const response = await api.post('/logout')

    dropUser();

    await router.push({ name: "login" })
  } catch(error) {
    console.error(error)
  }
}