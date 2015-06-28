var {
  Tabs,
  Tab,
  Paper
} = mui;

LetterBuilder = React.createClass({
  render() {
    return <div>
    <h1>Creating a letter</h1>
      <Paper zDepth={1}><Tabs>
        <Tab label="1. Recipients">
          <RecipientsComponent />
        </Tab>
        <Tab label="2. Photos">
          <SelectableFacebookPhotosGrid />
        </Tab>
        <Tab label="3. Message">
          Hello
        </Tab>
      </Tabs></Paper>
    </div>
  }
});