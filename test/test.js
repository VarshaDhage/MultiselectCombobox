import { LightningElement, track } from 'lwc';
export default class Test extends LightningElement {

    @track colorsList =[];
    @track pre_selected_colors=[];
    @track single_selected_color;
    @track multi_selected_colors=[];
    @track preselected_colors_list=[]

    connectedCallback() {
        
      this.colorsList.push({value:'Red', label:'Red'});
      this.colorsList.push({value:'Orange', label:'Orange'});
      this.colorsList.push({value:'Yellow', label:'Yellow'});
      this.colorsList.push({value:'Lavender', label:'Lavender'});
      this.colorsList.push({value:'Orchid', label:'Orchid'});
      this.colorsList.push({value:'Magenta', label:'Magenta'});
      this.colorsList.push({value:'Purple', label:'Purple'});
      this.colorsList.push({value:'Indigo', label:'Indigo'});
      this.colorsList.push({value:'LimeGreen', label:'LimeGreen'});
      this.colorsList.push({value:'Cyan', label:'Cyan'});
      this.colorsList.push({value:'RoyalBlue', label:'RoyalBlue'});

      this.colorsList.push({value:'Maroon', label:'Maroon'});
      this.colorsList.push({value:'GhostWhite', label:'GhostWhite'});
      this.colorsList.push({value:'Gray', label:'Gray'});
      this.colorsList.push({value:'Black', label:'Black'});
      this.colorsList.push({value:'Pink', label:'Pink'});

      this.pre_selected_colors.push('Orange');
      this.pre_selected_colors.push('Indigo');



                    this.template
                     .querySelectorAll('c-multiselect-combobox').forEach(element => {
                      if (element.label === 'Single select picklist') {
                      element.ReloadComponent(this.colorsList);
                      }
                    });

                    this.template
                     .querySelectorAll('c-multiselect-combobox').forEach(element => {
                      if (element.label === 'Multi select picklist') {
                      element.ReloadComponent(this.colorsList);
                      }
                    });


                    this.template
                     .querySelectorAll('c-multiselect-combobox').forEach(element => {
                      if (element.label === 'preselected multiselect values') {
                      element.ReloadComponentwith_preselectedvalues(this.colorsList,this.pre_selected_colors,true);
                      }
                    });

        
    }
    single_select_Color(event){
          this.single_selected_color = event.detail.payload.value;
          console.log('selected colors..',this.single_selected_color);
    }
    multi_select_Colors(event){
        this.multi_selected_colors = event.detail.payload.values;
         console.log('selected colors..'+this.multi_selected_colors);
    }
    preselect_Colors(event){
        this.preselected_colors_list = event.detail.payload.values;
         console.log('selected colors..'+this.preselected_colors_list);
    }

}