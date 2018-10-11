import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'

import { createProfile, getCurrentProfile } from '../../actions/profileActions'

//Components for formatting the page
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'

import isEmpty from '../../validation/is-empty'

class EditProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        //Get the profile state and then access the profile object which is contained inside
        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;

            //Bring skills array back to comma seperated value
            const skillsCSV = profile.skills.join(','); 

            //If profile field doesnt exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

            //Set component fields state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            })
        }     

    }

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }
        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile"
                        name="twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                        icon='fab fa-twitter'
                    />
                    <InputGroup
                        placeholder="Facebook Profile"
                        name="facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                        icon='fab fa-facebook'
                    />
                    <InputGroup
                        placeholder="Linkedin Profile"
                        name="linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                        icon='fab fa-linkedin'
                    />
                    <InputGroup
                        placeholder="Youtube Profile"
                        name="youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                        icon='fab fa-youtube'
                    />
                    <InputGroup
                        placeholder="Instagram Profile"
                        name="instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                        icon='fab fa-instagram'
                    />
                </div>
            )
        }

        //Select options for status
        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student', value: 'Developer' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

        return (
            <div className="editProfile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                              </Link>
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                           
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}></form>
                            <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your full name, company name, nickname"
                            />
                            <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                options={options}
                                error={errors.status}
                                info="Give us an idea of where you are at in your career"
                            />
                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Could be your own company, or one you work for"
                            />
                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Could be your own or a company website"
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="City & state/province (eg: Toronto, Ont)"
                            />
                            <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use comma to separate values (eg: HTML,CSS,Java)"
                            />
                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="If you want your latest reps and a Guthub link, include your username"
                            />
                            <TextAreaFieldGroup
                                placeholder="A short bio of yourself"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                            />
                            <div className="mb-3">
                                <button type="button" onClick={() => {
                                    this.setState(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }))
                                }} className="btn btn-light">
                                    Add Social Network Links
                              </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
                        </div>

                        <input type="submit" value="Submit" onClick={this.onSubmit} className="btn btn-info btn-block mt-4" />
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

const mapDispatchToProps = {
    createProfile, 
    getCurrentProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));