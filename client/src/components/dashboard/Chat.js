import React, { Component } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField';


class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [
                {
                    id:0,
                    username: 'Admin',
                    message: 'Welcome'
                }
            ],
            totalUsers: [
                {
                    username: '',
                    numUsers: 0
                }
            ],
            currentUser: this.props.username,
            currentMessage: ""
        }

        this.socket = io('localhost:4000')

        this.socket.emit('add user', this.props.username);

        this.socket.on('login', data => {
            this.setState({ messages: [...this.state.messages, ...data.res] }, () => {
                console.log(this.state.messages);
                
            })
        })

        this.socket.on('new message', data => {
            const message = new Message({
                id: data.username,
                message: data.message,
                senderName: data.username,
                username: data.username
            })

            this.setState({ messages: [...this.state.messages, message] })
        })

        this.socket.on('user joined', data => {
            this.setState({ totalUsers: [...this.state.totalUsers, data] })
        })
    }

    messageChange = (e) => {
        this.setState({ currentMessage: e.target.value })
    }

    messageSubmit = (e) => {
        const message = new Message({
            id: 0,
            message: this.state.currentMessage,
            senderName: this.props.username,
            username: this.props.username
        })

        this.socket.emit('new message', this.state.currentMessage)
        this.setState({ messages: [...this.state.messages, message], currentMessage: "" })
    }

    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          this.messageSubmit()
        }
      }

    render() {
        return (
            <div>
                <ChatFeed
                    style={{
                        overflow: 'scroll',
                        height: '50vh',
                    }}
                    messages={this.state.messages} 
                    hasInputField={false}
                    showSenderName 
                    bubblesCentered={false} 
                    bubbleStyles={
                    {
                        text: {
                        fontSize: 15
                        },
                        chatbubble: {
                        borderRadius: 30,
                        padding: 12
                        }
                    }
                    }
                />
                <form onSubmit={this.messageSubmit}>
                    <TextField
                        id="standard-multiline-flexible"
                        label={this.state.currentUser}
                        onKeyDown={this.onEnterPress}
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={this.state.currentMessage}
                        onChange={this.messageChange}
                        placeholder="Type Something..."
                        margin="normal"
                    />
                </form>
            </div>
        )
    }
}

export default Chat