function Set() {


	this.intersection = function(listA, listB) {

	   var resultList = []; // create a resultList array

			 if (listA === null || listB === null) {
				 return null; // return null to indicate error
			 }

		 	for (var i = 0; i < listA.length; i++) {
				var nextValue = listA[i]; // gets next value in the list

				// for every element in listB
				for (var j = 0; j < listB.length; j++) {
					if (listB[j] === nextValue) { // listB element equals nextValue
						resultList.push(listB[j]); // add listB element to the end of resultList
						break; // breaks out of the listB inner loop
					}
				}
			}

	   return resultList;
	}



	this.union = function(listA, listB) {

	   var resultList = []; // create an empty resultList array

		 if (listA === null || listB === null) {
			 return null; // return null to indicate error
		 }

			resultList = listA.concat(listB);
			for (var i = 0; i < resultList.length; ++i) {
				for (var j = i + 1; j < resultList.length; ++j) {
					if(resultList[i] === resultList[j]) {
						resultList.splice(j--, 1);
					}
			  }
		  }
	   return resultList;
	}






	this.relativeComplement = function(listA, listB) {

	   var resultList = []; // create an empty resultList array
		 var found;

		 if (listA === null || listB === null) {
			 return null; // return null to indicate error
		 }

		 for (var i = 0; i < listA.length; i++) {
			  found = true;
			 for (var j = 0; j < listB.length; j++) {
				 if (listA[i] === listB[j]) {
					 found = false;
					 break;
				 }
			 }
			 if (found === true) {
				 resultList.push(listA[i]);
			 }
		 }

	   return resultList;
	}



	this.symmetricDifference = function(listA, listB) {

	   var resultList = []; // create an empty resultList array
		 var abResult;
		 var baResult;

		 if (listA === null || listB === null) {
			 return null; // return null to indicate error
		 }

		abResult = this.relativeComplement(listA, listB);
		baResult = this.relativeComplement(listB, listA);

		this.append = function(resultList, found) {
			for (var i = 0; i < found.length; i++) {
				resultList.push(found[i]);
			}
		}

		this.append(resultList, abResult);
		this.append(resultList, baResult);

	   return resultList;
	}
}
