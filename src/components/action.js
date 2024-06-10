export const action = {
    actions: [],
    pushAction(action) {
        this.actions.push(action);
        console.log(this.actions);
    },

    pushDBAction(user) {
            let data = {
                actions: this.actions,
                user: user
            };
            const url = 'http://140.138.147.12:3000/action';  // 確保這裡是你的伺服器端點
            const payload = JSON.stringify(data);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: payload
            })
            .then(res => res.json())
            .then(res => {
                console.log('pushed action to db', res);
            })
            .catch(err => {
                console.error('Failed to push action to db', err);
            });
    }
};