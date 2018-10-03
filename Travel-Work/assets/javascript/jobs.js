$(document).ready(function () {
    var softwareselected = 'javascript';
    var locationselected = 'Austin';
    getJobs(softwareselected, locationselected, 12);
    var states = ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA", "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", "WI", "MO", "AR", "OK", "KS", "LA", "VA"];
    $.each(states, function (key, value) {
        var state = '<li><a href="#" class="teal-text select-location" data-location="' + value + '">' + value + '</a></li>';
        $('#dropdown-state').append(state);
    });
    var softwares = ["Ruby", "Javascript", "Node", "React"];
    $.each(softwares, function (key, value) {
        var software = '<li><a href="#" class="teal-text select-software" data-software="' + value + '">' + value + '</a></li>';
        $('#dropdown-software').append(software);
    });
    $(document).on('click', '.select-software', function () {
        softwareselected = $(this).data('software');
        $('#software-selected').text(softwareselected);
        getJobs(softwareselected, locationselected, 50);
        event.preventDefault();
    });
    $(document).on('click', '.select-location', function () {
        locationselected = $(this).data('location');
        $('#location-selected').text(locationselected);
        getJobs(softwareselected, locationselected, 50);
        event.preventDefault();
    });
    $(document).on('click', '.btn-savejob', function () {
        var user = firebase.auth().currentUser;
        if (user != null) {
            var jobtitle = $(this).data('jobtitle');
            var company = $(this).data('company');
            var url = $(this).data('url');
            var id = $(this).data('id');
            // console.log(jobtitle);
            addToMyJobs(user.uid, company, jobtitle, url, id)
            $(this).html('<i class="material-icons left">done</i> Saved');
        }else{
            alert('Please log in to save jobs.');
        }
        event.preventDefault();
    });
    $(document).on('click', '.btn-removejob', function () {
        var user = firebase.auth().currentUser;
        if (user != null) {
            var uid = $(this).data('uid');
            var id = $(this).data('id');
            console.log('removing jod with id ' + id);
            firebase.database().ref('user-jobs/' + uid + '/' + id ).remove();
            $('.' + id).fadeOut();
        }else{
            alert('Please log in to manage jobs')
        }
        event.preventDefault();
    });
});
function keyCleaner(keyid) {
    var key = keyid.replace(/[^0-9a-z]/gi, '');
    return key;
}
function saveJobs( jobtitle, jobdescription, joblocation, jobdate, url, how_to_apply, id, company, company_url, company_logo ) {
    var jobData = {
        company: company,
        jobtitle: jobtitle,
        description: jobdescription,
        location: joblocation,
        jobkey: id,
        date: jobdate,
        url: url,
        how_to_apply: how_to_apply
    };
    var companyData = {
        name: company,
        company_url: company_url,
        company_logo: company_logo,
        location: joblocation
    };
    var jobkey = id;
    var updates = {};
    updates['/jobs/' + jobkey] = jobData;
    updates['/companies/' + keyCleaner(company) ] = companyData;
    return firebase.database().ref().update(updates);
}
function addToMyJobs(uid, company, jobtitle, url, id) {
    var jobData = {
        uid: uid,
        company: company,
        jobtitle: jobtitle,
        jobkey: id,
        url: url
    };
    var jobkey = id;
    var updates = {};
    updates['/jobs/' + jobkey] = jobData;
    updates['/user-jobs/' + uid + '/' + jobkey] = jobData;
    return firebase.database().ref().update(updates);
}
function makeJobCard(title, company, url, jobkey) {
    return '<div class="col s12 m4"><div class="card"><div class="card-content"><span class="card-title truncate">' + title + '</span><p> at ' + company + '<br></p></div><div class="card-action"> <a class="waves-effect waves-light btn teal darken-3 btn-savejob" data-jobtitle="' + title + '" data-company="' + company + '" data-url="' + url + '" data-id="' + jobkey + '"><i class="material-icons left">add</i> Save</a> <a href="' + url + '" class="waves-effect waves-light btn teal darken-3" target="_blank"><i class="material-icons left">call_made</i> APPLY</a></div></div></div>';
}
function makeSavedJobCard(title, company, url, jobkey, uid) {
    return '<div class="col s12 m6 ' + jobkey + '"><div class="card"><div class="card-content"><span class="card-title truncate">' + title + '</span><p> at ' + company + '<br></p></div><div class="card-action"> <a href="' + url + '" class="waves-effect waves-light btn teal darken-3" target="_blank"><i class="material-icons left">call_made</i> APPLY</a> <a class="waves-effect waves-light btn red darken-3 btn-removejob" uid data-id="' + jobkey + '" data-uid="' + uid + '"><i class="material-icons left">remove</i> Remove</a></div></div></div>';
}
function makeCompanyCard(companyData) {
    if (companyData.company_logo) {
        var icon = '<img src="' + companyData.company_logo + '" alt="" class="circle">';
    }
    else{
        var icon = '<i class="material-icons circle">folder</i>';
    }
    return '<li class="collection-item avatar">' + icon + '<span class="title">' + companyData.name + '</span><p>' + companyData.location + '</p> <a href="' + companyData.company_url + '" class="secondary-content"><i class="material-icons">grade</i></a> </li>';
}
function getCompanyList() {
    var myCompanyList = firebase.database().ref('companies/');
    myCompanyList.on('child_added', function(data) {
        var card = makeCompanyCard(data.val());
        $('#companylist').append(card);
    });
}
function getMyJobs(uid) {
    var myJobsRef = firebase.database().ref('user-jobs/' + uid);
    myJobsRef.on('child_added', function(data) {
        console.log( data.val().jobtitle + ' is ' + data.val());
        console.log( data.val());
        var gig = makeSavedJobCard( data.val().jobtitle , data.val().company, data.val().url, data.val().jobkey, data.val().uid);
        console.log("Getting all my Jobs from firebase");
        console.log(gig);
        $('#savedjoblist').append(gig);
    });
}
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("Authenticated with uid:", user.uid);
        getMyJobs(user.uid);
    } else {
        console.log("Client unauthenticated.")
    }
});
function getJobs(software, location, limit) {
    $('#joblist').empty();
    var githubJobsURL = 'https://jobs.github.com/positions.json?description=' + software + '&location=' + location;
    $.ajax({
        url: githubJobsURL,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function (response) {
        $.each(response, function (key, value) {
            var gig = makeJobCard(value.title, value.company, value.url, value.id);
            $('#joblist').append(gig);
            saveJobs( value.title, value.description, value.location, value.created_at, value.url, value.how_to_apply, value.id, value.company, value.company_url, value.company_logo );
        });

    });
    var indeedURL = "https://api.indeed.com/ads/apisearch?publisher=8023780673544955&format=json&v=2&q=" + software + "&l=" + location + "&limit=" + limit;
    $.ajax({
        url: indeedURL,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function (response) {
            var results = response.results;
            // console.log(response);
            $.each(results, function (key, value) {
                var gig = makeJobCard(value.jobtitle, value.company, value.url, value.jobkey);
                $('#joblist').append(gig);
                saveJobs( value.jobtitle, value.snippet, value.formattedLocation, value.date, value.url, null, value.jobkey, value.company, null, null );
            });
        });
}