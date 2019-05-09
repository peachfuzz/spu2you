import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon, Alert, Intent, Switch, Toaster, IToaster } from "@blueprintjs/core";
// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent:"center"
//     }
// })
class PostDetail extends Component {
    constructor(props) {
        super(props)
        this.titleWasClicked = this.titleWasClicked.bind(this)
        this.checkInWasClicked = this.checkInWasClicked.bind(this)
        this.deleteWasClicked = this.deleteWasClicked.bind(this)
        this.state = {
            showMe: true
        }
    }


    titleWasClicked(event) {
        // alert("we will worry about this later honestly")
        event.preventDefault()
        const { dateCallback } = this.props
        //  console.log(dateCallback)
        if (dateCallback !== undefined) {
            dateCallback('YAS MAJOR ALERT')
        }
        //dateCallback("Are you sure you would like to confirm appointment")

    }

    checkInWasClicked(event) {
        // alert("we will worry about this later honestly")
        event.preventDefault()
        const { dateCallback } = this.props
        //  console.log(dateCallback)
        if (dateCallback !== undefined) {
            dateCallback('Are you sure you want to check into your reservation')
        }
        //dateCallback("Are you sure you would like to confirm appointment")

    }
    // sampleOperation(){
    //     alert("hi")
    // }
    deleteWasClicked(event) {
        // alert("we will worry about this later honestly")
        event.preventDefault()
        const { dateCallback } = this.props
        //  console.log(dateCallback)
        if (dateCallback !== undefined) {
            dateCallback('Are you sure you want to delete reservation')

            //<button onClick={() => this.operation()}> Click me </button>

        }
        //dateCallback("Are you sure you would like to confirm appointment")

    }

    render() {
        const { post } = this.props
        const { isOpen, isOpenError, ...alertProps } = this.state;
        return (

            <div>
                <h2 onClick={this.titleWasClicked}>{post.title}</h2>
                <p>{post.content}</p>

                <h2 onClick={this.checkInWasClicked}>{<Button rightIcon="arrow-right" intent="warning" text="Check-In" />}</h2>
                <Alert
                    {...alertProps}
                    //  className={this.props.data.themeName}
                    cancelButtonText="Cancel"
                    confirmButtonText="Move to Trash"
                    icon="trash"
                    intent={Intent.DANGER}
                    isOpen={isOpen}
                    onCancel={this.handleMoveCancel}
                    onConfirm={this.handleMoveConfirm}
                >
                    <p>
                        Are you sure you want to delete this reservation?
                    </p>
                </Alert>

                <Toaster ref={ref => (this.toaster = ref)} />


                <h2 onClick={this.deleteWasClicked}>{<Button rightIcon="trash" intent="success" text="Delete" />}</h2>
                <Toaster ref={ref => (this.toaster = ref)} />
            </div>
        )
    }
}

// <ul>
// {this.state.list.map(item => (
//     <li key={item.id}>

//       The reservation for {item.name} is {item.date} - {item.month} - {item.day} .
//       <button onClick={() => this.alertBox(item.id)}> 
//         Cancel Reservation
//       </button>
//     </li>
//   ))}
// </ul>

// onRemoveItem = id => {
//     this.setState(state => {
//         const list = state.list.filter(item => item.id !== id);

//         return {
//           list,
//         };
//       });
//     };
// handleMoveConfirm = () => {
//     this.setState({ isOpen: false });
//     this.toaster.show({ className: this.props.data.themeName, message: TOAST_MESSAGE });
// };

// const TOAST_MESSAGE = (
//     <div>
//         reservation was moved to Trash
//     </div>
// )
export default PostDetail