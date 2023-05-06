import { defineStore } from 'pinia';
import { User, UpdateForm } from './types';
import router from '../router/index'

export const useIndexStore = defineStore('Index', {
    state: () => ({
        isAuthenticated: !!localStorage.getItem('Token'),
        profile: {} as User
    }),
    actions: {
        updateAuthenticated()
        {
            this.isAuthenticated = !!localStorage.getItem('Token')
        },
        setToken(token: string)
        {
            if (token)
            {
                localStorage.setItem('Token', token)
                this.updateAuthenticated();
            }
        },
        removeToken()
        {
            localStorage.removeItem('Token')
            this.updateAuthenticated();
        },
        async signIn(email: string, password: string): Promise<string | null>
        {
            const data = JSON.stringify({
                email,
                password
            })
            const response = await fetch('http://localhost:3000/signin', {
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: data
            })
            if (response.status >= 200 && response.status <= 299)
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                this.setToken(jsonResponse.token)
                router.push({ name: 'profile' })
                return null
            } else
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                return 'Error';
            }
        },
        async signUp(surname: string, lastname: string, occupation: string, age: number, email: string, password: string)
        {
            const data = JSON.stringify({
                surname,
                lastname,
                occupation,
                age,
                email,
                password
            })
            const response = await fetch('http://localhost:3000/signup', {
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'  
                },
                body: data
            })
            if (response.status >= 200 && response.status <= 299)
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                this.setToken(jsonResponse.token)
                router.push({ name: 'profile' })
                return null
            } else
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                return 'Error';
            }
        },
        async signOut()
        {
            const response = await fetch('http://localhost:3000/signout', {
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                    'Content-Type': 'application/json'
                },
            })
            if (response.status >= 200 && response.status <= 299)
            {
                this.removeToken();
                router.push({ name: 'signin' })
                return null
            } else
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                return 'Error';
            }
        },
        async getProfile()
        {
            const response = await fetch('http://localhost:3000/profile', {
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                    'Content-Type': 'application/json'
                },
            })
            if (response.status >= 200 && response.status <= 299)
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                this.profile = jsonResponse;
                return null
            } else
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                return 'Error';
            }
        },
        async updateProfile(form: UpdateForm)
        {
            const data = JSON.stringify(form)
            const response = await fetch('http://localhost:3000/profile/update', {
                method: 'put',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                    'Content-Type': 'application/json'
                },
                body: data
            })
            if (response.status >= 200 && response.status <= 299)
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                this.profile = jsonResponse;
                return null
            } else
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                return 'Error';
            }
        },
        async deleteProfile()
        {
            const response = await fetch('http://localhost:3000/profile/delete', {
                method: 'delete',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                    'Content-Type': 'application/json'
                },
            })
            if (response.status >= 200 && response.status <= 299)
            {
                this.removeToken();
                router.push({ name: 'signin' })
                return null
            } else
            {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                return 'Error';
            }
        }
    }
});

