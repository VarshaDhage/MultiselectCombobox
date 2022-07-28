import { LightningElement, track, api } from 'lwc';
export default class MultiselectCombobox extends LightningElement {
    @api options;
    @api selectedValue;
    @api selectedvalues = [];
    @api label;
    @api minChar = 2;
    @api disabled = false;
    @api multiselect = false;
    @track value;
    @track values = [];
    @track optionData;
    @track searchString;
    @track message;
    @track showDropdown = false;
    connectedCallback() {
        this.showDropdown = false;
        let optionData = this.options ? (JSON.parse(JSON.stringify(this.options))) : null;
        this.value = this.selectedValue ? (JSON.parse(JSON.stringify(this.selectedValue))) : null;
        this.values = this.selectedvalues ? (JSON.parse(JSON.stringify(this.selectedvalues))) : null;
		if(this.value || this.values) {
          this.connectedcallback_extension(optionData);
        }
    }
    connectedcallback_extension(optionData){
        	let count = 0;
            let searchString;
            console.log('multiselectcombobox.........',optionData[0]);
            for(let i = 0; i < optionData.length; i++) {
                if(this.multiselect) {
                    if(this.values.includes(optionData[i].value)) {
                        optionData[i].selected = true;
                        count++;
                    }  
                } else {
                    if(optionData[i].value == this.value) {
                        searchString = optionData[i].label;
                    }
                }
            }
            if(this.multiselect)
                this.searchString = count + ' Option(s) Selected';
            else
                 this.searchString = searchString;
        this.optionData = optionData;
    }
    filterOptions(event) {
        this.searchString = event.target.value;
        if( this.searchString && this.searchString.length > 0 ) {
            this.message = '';
            if(this.searchString.length >= this.minChar) {
                let flag = true;
                for(let i = 0; i < this.optionData.length; i++) {
                    if(this.optionData[i].label.toLowerCase().trim().startsWith(this.searchString.toLowerCase().trim())) {
                        this.optionData[i].isVisible = true;
                        flag = false;
                    } else {
                        this.optionData[i].isVisible = false;
                    }
                }
                if(flag) {
                    this.message = "No results found for '" + this.searchString + "'";
                }
            }
            this.showDropdown = true;
        } else {
            this.showDropdown = false;
        }
	}
    selectItem(event) {
        let selectedVal = event.currentTarget.dataset.id;
        if(event.currentTarget.dataset.id) {
            let options = JSON.parse(JSON.stringify(this.optionData));
            let count = this.selectItem_extension(options,selectedVal);
            if(this.multiselect)
                this.searchString = count + ' Option(s) Selected';
            if(this.multiselect)
                event.preventDefault();
            else{
                 this.dispatchEvent(new CustomEvent('select', {
                     detail: {
                        'payloadType' : 'multi-select',
                        'payload' : {
                        'value' : this.value,
                        'values' : this.values
                        }
                   }
                }));
                  this.showDropdown = false;
            }
              
        }
    }
    selectItem_extension(options,selectedVal){
              let count = 0;
              for(let i = 0; i < options.length; i++) {
               options = this.selectItem_extension1(options,selectedVal,i);
                if(options[i].selected) {
                    count = count+1;
                }
            }
             this.optionData = options;
             return count;
    }
    selectItem_extension1(options,selectedVal,i){

         if(options[i].value === selectedVal) {
                    if(this.multiselect) {
                        if(this.values.includes(options[i].value)) {
                            this.values.splice(this.values.indexOf(options[i].value), 1);
                        } else {
                            this.values.push(options[i].value);
                        }
                        options[i].selected = options[i].selected ? false : true;   
                    } else {
                        this.value = options[i].value;
                        this.searchString = options[i].label;
                    }
                }
                return options;

    }
    showOptions() {
        if(this.disabled == false && this.options) {
            this.message = '';
            this.searchString = '';
            let options = JSON.parse(JSON.stringify(this.optionData));
            for(let i = 0; i < options.length; i++) {
                options[i].isVisible = true;
            }
            if(options.length > 0) {
                this.showDropdown = true;
            }
            this.optionData = options;
        }
	}
    removePill(event) {
        let value = event.currentTarget.name;
        let count = 0;
        let options = JSON.parse(JSON.stringify(this.optionData));
        for(let i = 0; i < options.length; i++) {
            if(options[i].value === value) {
                options[i].selected = false;
                this.values.splice(this.values.indexOf(options[i].value), 1);
            }
            if(options[i].selected) {
                count++;
            }
        }
        this.optionData = options;
        if(this.multiselect){
           this.searchString = count + ' Option(s) Selected';
        }
        this.dispatchEvent(new CustomEvent('select', {
                detail: {
                    'payloadType' : 'multi-select',
                    'payload' : {
                        'value' : this.value,
                        'values' : this.values
                    }
                }
            }));
    }
    blurEvent() {
        let previousLabel;
        let count = 0;
        for(let i = 0; i < this.optionData.length; i++) {
            if(this.optionData[i].value === this.value) {
                previousLabel = this.optionData[i].label;
            }
            if(this.optionData[i].selected) {
                count++;
            }
        }
        if(this.multiselect)
        	this.searchString = count + ' Option(s) Selected';
        else
        	this.searchString = previousLabel;
       
       if(this.multiselect){
            this.dispatchEvent(new CustomEvent('select', {
            detail: {
                'payloadType' : 'multi-select',
                'payload' : {
                    'value' : this.value,
                    'values' : this.values
                }
            }
        }));
       }
       
    }
   
    handleMouseOut(){
        this.showDropdown = false;
    }
    handlescroll(){
        this.showDropdown = true;
    }
    @api
    ReloadComponent(newoptions) {
        this.options = newoptions;
        this.showDropdown = false;
        let optionData = this.options ? (JSON.parse(JSON.stringify(this.options))) : null;
        this.value = this.selectedValue ? (JSON.parse(JSON.stringify(this.selectedValue))) : null;
        this.values = this.selectedvalues ? (JSON.parse(JSON.stringify(this.selectedvalues))) : null;
		if(this.value || this.values) {
              this.connectedcallback_extension(optionData);
        }
    }
    @api
    ReloadComponentwith_preselectedvalues(newoptions, selectedvalues, multiselect) {
        this.options = newoptions;
        if(this.selectedvalues.length>0){
             this.selectedvalues = selectedvalues;
        }
        this.showDropdown = false;
        let optionData = this.options ? (JSON.parse(JSON.stringify(this.options))) : null;
        if(multiselect==false){
             this.value = this.selectedvalue ? (JSON.parse(JSON.stringify(this.selectedvalues))) : null;
        }
        if(multiselect==true){
            this.values = this.selectedvalues ? (JSON.parse(JSON.stringify(this.selectedvalues))) : null;
        }
        if(this.value || this.values || multiselect==false) {
         this.ReloadComponentwith_preselectedvalues_extension(optionData,selectedvalues,multiselect);
        }
    }
    ReloadComponentwith_preselectedvalues_extension(optionData,selectedvalues,multiselect){
          	let count = 0;
          for(let i = 0; i < optionData.length; i++) {
                if(multiselect && this.values) {
                    if(this.values.includes(optionData[i].value)) {
                        optionData[i].selected = true;
                        count++;
                    }  
                } 
                else {
                    this.value = selectedvalues[0];
                    if(optionData[i].value == this.value) {
                      this.value = optionData[i].value;
                      this.searchString = optionData[i].label;
                  } 
                }
            }
            this.optionData = optionData;
            if(multiselect && this.values)
                this.searchString = count + ' Option(s) Selected';
    }
     
    
}