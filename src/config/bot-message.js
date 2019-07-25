const botMessage = {
    'vi': {
        '-2': { text: 'Vui lòng nhập lại lệnh.' },
        '-1': { text: 'Có lỗi xảy ra trong quá trình xử lí, vui lòng thử lại!' },
        0: { text: 'Xin chào, tôi là ConfessionBot.' },
        1: {
            text: 'Bạn muốn làm gì?',
            buttons: ['Chuyển ngôn ngữ', 'Đăng confession']
        },
        2: {
            text: 'Lựa chọn loại ngôn ngữ',
            buttons: ['Tiếng Việt', 'Tiếng Anh']
        },
        3: { text: 'Nhập confession, kết thúc bằng cách gõ "End".' },
        4: { text: 'Confession của bạn đã được gửi.' }
    },
    'en-us': {
        '-2': { text: 'Please input command again.' },
        '-1': { text: 'Some thing went wrong, please try again later!' },
        0: { text: 'Hi there, I am ConfessionBot.' },
        1: {
            text: 'What you want to do?',
            buttons: ['Change language', 'Post confession']
        },
        2: {
            text: 'Choose language',
            buttons: ['Vietnamese', 'English']
        },
        3: { text: 'Post confession, finish by input "End".' },
        4: { text: 'Your confession is sent.' }
    }
}
const chatStatus = {
    'PARDON': -2,
    'ERROR': -1,
    'NEW': 0,
    'COMMAND': 1,
    'CHANGE-LANGUAGE': 2,
    'POST-CONFESSION': 3,
    'POST-CONFESSION-SUCESS': 4
}
module.exports = { botMessage, chatStatus }
