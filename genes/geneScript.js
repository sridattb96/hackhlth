

var app = angular.module('myApp', []);


function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}




app.controller('geneCtrl', function($scope,$timeout) {

    // Test Genetic Variation
    var sEH="ggcacgagctctctctctctctctctctctctctcgccgccatgacgctgcgcggcgccgtcttcgaccttgacggggtgctggcgctgccagcggtgttcggcgtcctcggccgcacggaggaggccctggcgctgcccagaggacttctgaatgatgctttccagaaagggggaccagagggtgccactacccggcttatgaaaggagagatcacactttcccagtggataccactcatggaagaaaactgcaggaagtgctccgagaccgctaaagtctgcctccccaagaatttctccataaaagaaatctttgacaaggcgatttcagccagaaagatcaaccgccccatgctccaggcagctctcatgctcaggaagaaaggattcactactgccatcctcaccaacacctggctggacgaccgtgctgagagagatggcctggcccagctgatgtgtgagctgaagatgcactttgacttcctgatagagtcgtgtcaggtgggaatggtcaaacctgaacctcagatctacaagtttctgctggacaccctgaaggccagccccagtgaggtcgtttttttggatgacatcggggctaatctgaagccagcccgtgacttgggaatggtcaccatcctggtccaggacactgacacggccctgaaagaactggagaaagtgaccggaatccagcttctcaataccccggcccctctgccgacctcttgcaatccaagtgacatgagccatgggtacgtgacagtaaagcccagggtccgtctgcattttgtggagctgggctggcctgctgtgtgcctctgccatggatttcccgagagttggtattcttggaggtaccagatccctgctctggcccaggcaggttaccgggtcctagctatggacatgaaaggctatggagagtcatctgctcctcccgaaatagaagaatattgcatggaagtgttatgtaaggagatggtaaccttcctggataaactgggcctctctcaagcagtgttcattggccatgactggggtggcatgctggtgtggtacatggctctcttctaccccgagagagtgagggcggtggccagtttgaatactcccttcataccagcaaatcccaacatgtcccctttggagagtatcaaagccaacccagtatttgattaccagctctacttccaagaaccaggagtggctgaggctgaactggaacagaacctgagtcggactttcaaaagcctcttcagagcaagcgatgagagtgttttatccatgcataaagtctgtgaagcgggaggactttttgtaaatagcccagaagagcccagcctcagcaggatggtcactgaggaggaaatccagttctatgtgcagcagttcaagaagtctggtttcagaggtcctctaaactggtaccgaaacatggaaaggaactggaagtgggcttgcaaaagcttgggacggaagatcctgattccggccctgatggtcacggcggagaaggacttcgtgctcgttcctcagatgtcccagcacatggaggactggattccccacctgaaaaggggacacattgaggactgtgggcactggacacagatggacaagccaaccgaggtgaatcagatcctcattaagtggctggattctgatgcccggaacccaccggtggtctcaaagatgtagaacgcagcgtagtgcccacgctcagcaggtgtgccatccttccacctgctggggcaccattcttagtatacagaggtggccttacacacatcttgcatggatggcagcattgttctgaaggggtttgcagaaaaaaaagattttctttacataaagtgaatcaaatttgacattattttagatcccagagaaatcaggtgtgattagttctccaggcatgaatgcatcgtccctttatctgtaagaacccttagtgtcctgtagggggacagaatggggtggccaggtggtgatttctctttgaccaatgcatagtttggcagaaaaatcagccgttcatttagaagaatcttagcagagattgggatgccttactcaataaagctaagatgac";
    var varLoc=860;
    var wtNT='g';
    var varNT='a';


    console.log($scope.variants)

    sEH_var = setCharAt(sEH,varLoc-1,varNT);
    sEH_var = setCharAt(sEH_var,909-1,"g");

    var sEHVariant = {
            name:   "sEH",
            loc:    varLoc,
            wtNT:   wtNT,
            varNT:  varNT,
            activeColor: "red"
        };

    
    var activeVariant= sEHVariant // Varient currently being scanned for

    // temp test patients
    obj1={
        "firstname":    "Samir",
        "lastname":     "Akre",
        "gene":         sEH
    };

    obj2={
        "firstname":    "Sharvari",
        "lastname":     "Bhide",
        "gene":         sEH_var
    };
    
    // init patients for test
    var patients = [obj1,obj2];
    
    var varIndex = activeVariant.loc - 1;
    $scope.patients=[obj1,obj2];


    // Gets Variants from Firebase, consolidates statistics about the variants
    $scope.variants = FBHelper_.getBucketContents("Variants",
        function(arr)
        {
        for(var i = 0; i < $scope.variants.length; i++) {
            $scope.variants[i].count=0;
            console.log($scope.variants[i].name)
            for(var j = 0; j < $scope.patients.length; j++){
                if( $scope.patients[j].gene[$scope.variants[i].loc-1] == $scope.variants[i].varNT) {
                    $scope.variants[i].count++;       
                    console.log($scope.patients[j].firstname)
                    console.log($scope.variants[i].varNT)
                    console.log($scope.patients[j].gene[$scope.variants[i].loc-1])
                }
                else
                {
                }
            };
        }
            $scope.$apply()
            $scope.activeVariant=arr[0]
            $scope.varChange(arr[0])

        }
    ); 


    

    $scope.varChange = function(v) {
         
        console.log(v.name)
        for(var i=0; i <  $scope.patients.length; i++)
        {
            console.log($scope.patients[i].firstname)
            console.log($scope.patients[i].gene[v.loc-1])
            if($scope.patients[i].gene[v.loc-1] == v.wtNT)
            {
                $scope.patients[i].variant = 1
            }
            else
            {
                $scope.patients[i].variant = 0
            }
        }
    }    
    $scope.allPatientsVar = function() {
        for(var i = 0; i < $scope.variants.length; i++) {
            $scope.variants[i].count=0;
            console.log($scope.variants[i].name)
            for(var j = 0; j < $scope.patients.length; j++){
                if( $scope.patients[j].gene[$scope.variants[i].loc-1] != $scope.variants[i].varNT) {
                    $scope.variants[i].count++;       
                }
                else
                {
                    console.log($scope.variants[i].wtNT)
                    console.log($scope.variants[i].varNT)
                    console.log($scope.patients[j].gene[$scope.variants[i].loc-1])
                }
            };
        }
        
    }

});

app.controller('variantCtrl', function($scope,$timeout) {
    
    $scope.newVariant = {
        name:"",
        chr:"",
        loc:"",
        wtNT:"",
        varNT:""
    };


    $scope.variants = FBHelper_.getBucketContents("Variants",
        function(arr)
        {
            console.log(arr)

            $scope.$apply();
            $scope.newVariant = {
                name:"",
                chr:"",
                loc:"",
                wtNT:"",
                varNT:""
            }
        }
    )

    $scope.addVariant = function() {
        console.log($scope.newVariant);
        FBHelper_.newVariant($scope.newVariant)
        $scope.variants.push($scope.newVariant)
    };
    


});

