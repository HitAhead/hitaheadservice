var hospitals = {
  'chennai':{
    'Apollo':{
      'karapakkam':{
        'GYN':{
           'Jothimani':'APL-KAR-GYN-001'
          ,'Sriramkumar':'APL-KAR-GYN-002'
          ,'Ram':'APL-KAR-GYN-003'
          ,'Kumar':'APL-KAR-GYN-004'
          ,'Sriram':'APL-KAR-GYN-005'
        }
        ,'PED':{
           'Mani':'APL-KAR-PED-001'
          ,'Arun':'APL-KAR-PED-001'
          ,'Satheesh':'APL-KAR-PED-003'
          ,'Arjun':'APL-KAR-PED-004'
        }
      }
    }
  }
};

var getQueueName = function(qDetails){

  var queueName = hospitals[qDetails.city][qDetails.hospitalName][qDetails.hospitalLocality][qDetails.department][qDetails.doctorID];
  console.log(queueName);
  return queueName;
};

module.exports = {
  getQueueName:getQueueName
};
