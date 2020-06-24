import React from 'react'
import {getAllUsersFromServer} from '../store/allUsers'
import {connect} from 'react-redux'

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {allUsers: []}
  }

  componentDidMount() {
    this.props.getAllUsersFromServer()
  }

  render() {
    return (
      <div className="allUsers">
        <h1>All Users</h1>
        {!this.props.allUsers.length
          ? null
          : this.props.allUsers.map(user => {
              return (
                <div key={user.id}>
                  <h3>Email: {user.email}</h3>
                  <h4>User Id: {user.id}</h4>
                </div>
              )
            })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allUsers: state.allUsers
})

const mapDispatchToProps = dispatch => ({
  getAllUsersFromServer: () => dispatch(getAllUsersFromServer())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
