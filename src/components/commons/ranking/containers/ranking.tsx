import React from 'react';

import {RankingLayout} from '../../../../components/commons/ranking';

interface RankingProps {
  color: string;
  title: string;
  data: any;
}

class Ranking extends React.Component<RankingProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      showMore: false,
      data: [],
    };

    this.setShowMore = this.setShowMore.bind(this);
    this.toggleData = this.toggleData.bind(this);
  }

  componentDidMount() {
    this.toggleData(false);
  }

  setShowMore(showMore: boolean) {
    this.setState({showMore: showMore});
    this.toggleData(showMore);
  }

  toggleData(showMore: boolean) {
    if (showMore) {
      this.setState({data: this.props.data});
    }

    if (!showMore) {
      if (this.props.data && this.props.data.length > 0) {

        const data = [];
        const dataLength = this.props.data.length;

        for (let index = 0; index < 3; index++) {
          const element = this.props.data[index];
          if (element) {
            data.push(element);
          }
        }
        if (dataLength > 3) {
          if (this.props.data[dataLength - 2]) {
            data.push(this.props.data[dataLength - 2]);
          }
          if (this.props.data[dataLength - 1]) {
            data.push(this.props.data[dataLength - 1]);
          }
        }
        this.setState({data: data});
      } else {
        this.setState({data: []});
      }
    }
  }

  render() {
    return (
      <RankingLayout
        color={this.props.color}
        title={this.props.title}
        data={this.state.data}
        showMore={this.state.showMore}
        setShowMore={this.setShowMore}
      />
    );
  }
}

export default Ranking;
