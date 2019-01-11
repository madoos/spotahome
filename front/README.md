# Development context

The frontend is developed with component-based architecture, functional approach (functional programing) because it favors the reuse and building with Webpack.

Use rxjs and socket.io to handle real time connections.

## Components

The components are divided into two groups. `stateless` used for render UI and `containers` used to handle the state of application.

Why no use redux?
`It is not necessary`

## Stateless Components

- Brand: `Show the brand name`
- Card: `Preview of a Home`
- CardList: `List of Card components`
- Detail: `Show Detail and photo home`
- Layout: `Used to set global styles`
- Monitor `Notify users observing the same property`

## Container Components

- Home: `Obtain data from back and show the house available. Handle state and render UI`
- Detail: `Obtain home detail from back, monitoring users in real time. . Handle state and render UI`

## HOCS

- renderWhen: `Handle conditional render`

```javascript
import Detail from './components/Detail'
import {renderWen} from './src/utils'

const MaybeDetail = renderWen(({detail}) => !!detail, Detail)

// In component file
class MyComponent extends Component {
  state = {
    detail: null,
  }

  render() {
    const {detail} = this.state
    return (<MaybeDetail {...detail}>)
  }

  async componentDidMount() {
    const detail = await api.getDetail(this.props.id)
    this.setState({detail})
  }
}
```
