let isRequestPending = false; // 模块级变量来跟踪请求状态

export const action = {
    actions: [],
    
    pushAction(action) {
        this.actions.push(action);
    },

    pushDBAction(user) {
        if (isRequestPending) {
            console.log('Request is already in progress, skipping duplicate...');
            return; // 如果已经有请求正在进行中，则直接返回
        }
    
        let data = {
            actions: this.actions,
            user: user
        };
        const url = 'http://140.138.147.12:3000/action';  // 确保这里是你的服务器端点
        const payload = JSON.stringify(data);
    
        isRequestPending = true; // 在发送请求之前设置标志为true
    
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
            isRequestPending = false; // 请求成功后重置标志
        })
        .catch(err => {
            console.error('Failed to push action to db', err);
            isRequestPending = false; // 请求失败后也重置标志
        });
    }
};
