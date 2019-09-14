from flask import Flask, request,jsonify
import json
import requests
import datetime
import http.client, urllib.request, urllib.parse, urllib.error, base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



@app.route('/')
def hello():
    return 'hello worlds'


@app.route('/start')
def get_booker_token():
    headers = {
    # Request headers
    'Content-Type': 'application/x-www-form-urlencoded',
    'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }

    params = urllib.parse.urlencode({
    })

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request("POST", "/v5/auth/connect/token?%s" % params, 'grant_type=client_credentials&client_id=3WCCU4EY81os&client_secret=ppDcPjF9Ex2G&scope=customer', headers)
        response = conn.getresponse()
        data = response.read()
        data=data.decode('utf-8')
        print(data)
        conn.close()

    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))

    #data_json = json.loads(data)

    #access_token = data_json['access_token']

    return data


@app.route('/create', methods=['POST'])
def my_test_endpoint():
    input_json = request.get_json(force=True)
    # force=True, above, is necessary if another developer
    # forgot to set the MIME type to 'application/json'

    params = urllib.parse.urlencode({
    })

    headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }

    body_var2 = json.dumps(input_json)

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request("POST", "/v4.1/customer/customer/account?%s" % params, body_var2, headers)
        response = conn.getresponse()
        print(response.status)
        data = response.read()
        print(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))

    data_json = data.decode('utf-8')

    return data_json

@app.route('/location', methods=['POST'])
def get_location():
    input_json = request.get_json(force=True)
    token_string = json.dumps(input_json)
    token = json.loads(token_string)
    headers = {
    # Request headers
    'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }

    params = urllib.parse.urlencode({
        'access_token': token["access_token"]
    })

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request("GET", "/v4.1/customer/location/38698?%s" % params, '', headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
        
    data_json = data.decode('utf-8')

    return data_json



@app.route('/login',methods=['POST'])
def login():
    input_json = request.get_json(force=True)

    headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }

    params = urllib.parse.urlencode({
    })

    login_json = json.dumps(input_json)

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request("POST", "/v4.1/customer/customer/login?%s" % params, login_json, headers)
        response = conn.getresponse()
        print(response.status)
        data = response.read()
        print(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))

    data_json = data.decode('utf-8')




    return data_json


@app.route('/treatments',methods=['POST'])
def find_treatments():
    input_json = request.get_json(force=True)
    headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }

    params = urllib.parse.urlencode({
    })

    treatments_json = json.dumps(input_json)

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request("POST", "/v4.1/customer/treatments?%s" % params, treatments_json, headers)
        response = conn.getresponse()
        print(response.status)
        data = response.read()
        print(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))

    sample_treatments_string = data.decode('utf-8')

    sample_treatments = json.loads(sample_treatments_string)

    # names = []
    # for i in sample_treatments['Treatments']:
    #     names.append(i['Name'])

    # prices = []

    # for i in sample_treatments['Treatments']:
    #     prices.append(i['Price']['Amount'])

    # dictionary = dict(zip(names,prices))
    # _dict = dictionary.dumps(dictionary)

    return sample_treatments_string


@app.route('/addon', methods=['POST'])
def find_addOns():
    input_json = request.get_json(force=True)
    input_string = json.dumps(input_json)
    input_data = json.loads(input_string)
    treatment_id = input_data["id"]

    headers = {
        # Request headers
        'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }


    params = urllib.parse.urlencode({
        'access_token': input_data["access_token"]
    })

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request(
            "GET", "/v4.1/customer/treatment/%d/addons?%s" % (treatment_id, params), "", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
    
    addon_string = data.decode('utf-8')

    return addon_string

@app.route('/employees',methods=['POST'])
def find_employees():
    input_json = request.get_json(force=True)
    headers = {
        # Request headers
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }

    params = urllib.parse.urlencode({
    })

    employees_json = json.dumps(input_json)

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request("POST", "/v4.1/customer/employees?%s" % params, employees_json, headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))

    data_json = data.decode('utf-8')

    # sample_employees = json.loads(data_json)

    # firstNames = []
    # lastNames = []
    # ids = []

    # for i in sample_employees['Results']:
    #     firstNames.append(i['FirstName'])
    #     lastNames.append(i['LastName'])
    #     ids.append(i['ID'])


    # dictionary = dict(zip(firstNames,zip(lastNames,ids)))



    return data_json

@app.route('/time',methods=["POST"])
def find_time():
    input_json = request.get_json(force=True)
    input_string = json.dumps(input_json)
    input_data = json.loads(input_string)
    dateTime = datetime.datetime(
        input_data["fromDateTime"]["year"],
        input_data["fromDateTime"]["month"],
        input_data["fromDateTime"]["day"])
    dateTime.isoformat()
    location_id = input_data["LocationId"]
    employee_id = input_data["employeeId"]
    treatment_id = input_data["serviceId"]
    access_token = input_data["access_token"]


    headers = {
        # Request headers
        'Authorization': access_token,
        'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }

    params = urllib.parse.urlencode({
        # Request parameters
        'LocationId': location_id,
        'fromDateTime': dateTime,
        'serviceId[]': treatment_id[0],
        'employeeId': employee_id,
    })

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request("GET", "/v5/realtime_availability/availability/1day/?%s" %
                    params, "", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))

    data_json = data.decode('utf-8')

    return data_json


@app.route('/availabledates',methods=["POST"])
def return_dates():
    input_json = request.get_json(force=True)
    input_string = json.dumps(input_json)
    input_data = json.loads(input_string)
    fromDate = datetime.datetime.strptime(
        input_data["fromDateTime"], "%Y-%m-%dT%H:%M:%S%z")
    toDate = datetime.datetime.strptime(
        input_data["toDate"], "%Y-%m-%dT%H:%M:%S%z")

    headers = {
        # Request headers
        'Authorization': input_data['access_token'],
        'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }

    params = urllib.parse.urlencode({
	    # Request parameters
	    'locationIds': input_data['LocationId'],
	    'fromDate': fromDate,
	    'toDate': toDate,
	    'serviceId': input_data['serviceId'][0],
	    'employeeId': input_data['employeeId'],
	})

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request("GET", "/v5/realtime_availability/AvailableDates?%s" %
                    params, "", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        conn.close()


    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))

    data_json = data.decode('utf-8')

    return data_json

@app.route('/book',methods=["POST"])
def book_appointment():
    input_json = request.get_json(force=True)
    headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'f63a53d55c224054b9396f5cc7ce2813',
    }

    params = urllib.parse.urlencode({
    })

    post_json = json.dumps(input_json)

    try:
        conn = http.client.HTTPSConnection('api-staging.booker.com')
        conn.request("POST", "/v4.1/customer/appointment/create?%s" % params, post_json, headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))

    data_json = data.decode('utf-8')

    return data_json















if __name__ == '__main__':
     app.run(port=5002)
