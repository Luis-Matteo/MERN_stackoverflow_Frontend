import React, {useEffect, Fragment, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTags } from '../../redux/tags/tags.actions';

import './TagsPage.styles.scss'
import SideBar from '../../components/sideBar/sideBar.component';
import TagPanel from './TagPanel.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import Spinner from "../../components/spinner/spinner.component";

import SearchBox from "../../components/SearchBox/SearchBox.component";

const TagsPage = ({ getTags , tag: { tags, loading }}) => {
    useEffect(() => {
        getTags();
    }, [getTags]);

    const [ fetchSearch, setSearch] = useState('');

    const handleChange = e => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    return loading || tags === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='tags-page fc-black-800'>
                    <h1 className='headline'>Tags</h1>
                    <p className='fs-body'>
                        A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
                    </p>
                    <div className='headline-count'>
                        <div>
                            <span>1,025 tags</span>
                            <SearchBox
                                placeholder={'filter by tag name'}
                                handleChange={handleChange}
                                pt={'pt12'}
                            />
                        </div>
                    </div>
                    <div className='user-browser'>
                        <div className='grid-layout'>
                            {tags.filter(tag => tag.tagname.toLowerCase().includes(fetchSearch.toLowerCase())).map(tag => (
                                <TagPanel key={tag.tagname} tag = {tag}/>))}
                        </div>
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    </Fragment>
};

TagsPage.propTypes = {
    getTags: PropTypes.func.isRequired,
    tag: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tag: state.tag
});

export default connect(mapStateToProps,{ getTags })(TagsPage);