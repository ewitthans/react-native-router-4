import React from "react";
import { StyleSheet, Button, Platform, View, Text, Image } from "react-native";
import { createAppContainer, handleNavigationChange } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//Mon 11.25.19 React Navigation 4
//https://reactnavigation.org/docs/en/hello-react-navigation.html

//HOME SCREEN
class HomeScreen extends React.Component {
  //route header
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: "Homiest of Pages",
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate("MyModal")}
          title="Info"
          color={Platform.OS === "ios" ? "#fff" : null}
        />
      )
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.HomeText}>Welcome</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            //navigate to the details route with params
            this.props.navigation.navigate("Details", {
              itemId: 86,
              testString: "yes",
              otherParam: "anything you want here"
            });
          }}
        />
        <Button
          title="Go to Information"
          onPress={() => this.props.navigation.navigate("Information")}
        />
        <Button
          title="Go to Images"
          onPress={() => this.props.navigation.navigate("Images")}
        />
      </View>
    );
  }
}

//DETAILS SCREEN
class DetailsScreen extends React.Component {
  //route header that gets passed props, changes on second details click
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("otherParam", "A Nested Details Screen")
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.DetailsText}>Details</Text>

        <Text>
          itemId: {JSON.stringify(navigation.getParam("itemId", "no id"))}
        </Text>
        <Text>
          did it work:{" "}
          {JSON.stringify(navigation.getParam("testString", "no it did not"))}
        </Text>
        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam("otherParam", "default value"))}
        </Text>

        <Button
          title="Go to Information"
          onPress={() => this.props.navigation.navigate("Information")}
        />
        <Button
          title="Go to Details AGAIN"
          onPress={() =>
            navigation.push("Details", {
              itemId: Math.floor(Math.random() * 100),
              testString: "yesx2"
            })
          }
        />
        <Button
          title="Update the title/otherParam"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: "Updated!" })
          }
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

//INFORMATION SCREEN
class InformationScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    console.log(navigationOptions);
    // Notice the logs ^
    // sometimes we call with the default navigationOptions and other times
    // we call this with the previous navigationOptions that were returned from
    // this very function
    return {
      title: navigation.getParam("otherParam", "Best Information Around"),
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
      headerRight: () => (
        <Button
          onPress={navigation.getParam("increaseCount")}
          title="Click for +1"
          color="#fff"
        />
      )
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.DetailsText}>Information</Text>
        <Text>Count: {this.state.count}</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("Details")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

//bringing in/rendering the image SMALL ICON
class ImgScreen extends React.Component {
  render() {
    return (
      <Image
        source={require("./assets/fake1.png")}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}
//bringing in/rendering the image LARGE ICON
class ImgScreenBig extends React.Component {
  render() {
    return (
      <Image
        source={require("./assets/fake1.png")}
        style={{ width: 300, height: 300 }}
      />
    );
  }
}
// IMAGE SCREEN
class ImageScreen extends React.Component {
  static navigationOptions = {
    headerTitle: () => <ImgScreen />,
    headerRight: () => (
      <Button
        onPress={() => alert("This is an info button on the photo page!")}
        title="Click me"
        color="#fff"
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <ImgScreenBig />
        <Text style={styles.DetailsText}>Images</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("Details")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

//style sheets - container, text, etc
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "wheat",
    alignItems: "center",
    justifyContent: "center"
  },
  HomeText: {
    fontSize: 50,
    color: "green"
  },
  DetailsText: {
    fontSize: 50,
    color: "orange"
  }
});

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Information: InformationScreen,
    Images: ImageScreen
  },
  {
    initialRouteName: "Home",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "orange"
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
//enables modals
//https://reactnavigation.org/docs/en/modal.html
const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    MyModal: {
      screen: ModalScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      //read more about onNavigationStateChange - has to do with nav props being passed....
      //https://reactnavigation.org/docs/en/app-containers.html
      <AppContainer
        onNavigationStateChange={handleNavigationChange}
        uriPrefix="/app"
      />
    );
  }
}
