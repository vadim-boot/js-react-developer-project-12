export default {
    translation: {
        // BEGIN (write your solution here)
        languages: {
            en: 'English',
            ru: 'Русский',
        },
        chat: {
            logout: 'Logout',
            msgList: {
                head_zero: '{{count}} message',
                head_one: '{{count}} message',
                head: '{{count}} messages',
            },
            channelList: {
                manage: 'Manage channel',
                delete: 'Delete',
                rename: 'Rename',
                head: 'Channels',
            },
        },
        loginForm: {
            reqField: 'Required field',
            yourName: 'Your username',
            password: 'Password',
            enter: 'Enter',
            noAcc: 'Don\'t have account?',
            regAcc: 'Registration',
            header: 'Login',
            error: 'Wrong username or password!'
        },
        signupForm: {
            reqField: 'Required field',
            usernameLength: 'From 3 to 20 symbols',
            passLength: 'From 6 symbols',
            passCheck: 'Passwords do not match!',
            header: 'Sign up',
            yourName: 'Your username',
            password: 'Password',
            passwordConfirm: 'Confirm password',
            signUp: 'Sign up',
            error: 'Username already exists!'
        },
        channelModal: {
            nameReq: 'Required field',
            nameLength: 'From 3 to 20 symbols',
            nameTestName: 'Unique channel name',
            nameTestMsg: 'Channel name already exists!',
            addHead: 'Add channel',
            renameHead: 'Rename channel',
            btCancel: 'Cancel',
            btSubmit: 'Enter',
            delHead: 'Delete channel',
            delMsg: 'Are you sure?',
        }
    },
};