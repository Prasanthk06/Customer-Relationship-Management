import React , {createContext,useState,useContext,useEffect} from "react";

const ContactContext = createContext(); 
export const  ContactProvider = ({children}) =>{
    const [contacts, setContacts] = useState(()=>{
        const savedcon = localStorage.getItem('contacts');
        return savedcon ? JSON.parse(savedcon) : [{
            id: 1,
            name: 'Bhat Atmajkumar S',
            mobile: '8976456938',
            altnumber: '',
            emailid: 'bhat@example.com',
            jobTitle: 'Engineer',
            status: 'Open',
            subStatus: 'Fresh Lead',
            address1: '123 Main St, City',
            address2: '456 Secondary St, City',
            pincode: '123456',
            district:'Thiruvllur',
            state:'Tamil Nadu',
            nextFollowUp: '-',
            leadCreated: '07-Mar-2025',
            source: 'Facebook',
            group: 'Investor',
            chitAmount: '50000'
          }]
        
    })


    useEffect(() =>{
        localStorage.setItem('contacts',JSON.stringify(contacts));
    },[contacts])

    const addcontact = (data) =>{
        const newContact = {
            id: contacts.length > 0 ? Math.max(...contacts.map(c=>c.id)) + 1 : 1,
            name: data.name,
            mobile: data.mobile,
            altnumber: data.altnumber,
            emailid: data.emailid,
            jobTitle: data.jobTitle,
            status:data.status,
            address1:data.address1,
            address2:data.address2,
            pincode:data.pincode,
            district:data.district,
            state:data.state,
            subStatus:data.subStatus,
            nextFollowUp:'-',
            leadCreated: new Date().toLocaleDateString('en-GB',{
                day:'2-digit',
                month:'short',
                year:'numeric'
            }),
            source:data.source,
            group:data.group,
            chitAmount:data.chitAmount

        }
        setContacts([...contacts, newContact]);
        return newContact;
    }

    const getData = (id) =>{
        return contacts.find(contact => contact.id === id);
    }

     const updateContact = (id, updatedData) => {
        const updatedContacts = contacts.map(contact => 
            contact.id === parseInt(id,10) ? {...contact, ...updatedData} : contact
        );
        setContacts(updatedContacts);
        return updatedContacts.find(contact => contact.id === parseInt(id,10));
    }
    const Value = {
        contacts,
        addcontact,
        getData,
        updateContact,
    }
    return(
      <ContactContext.Provider value={Value}>
        {children}
      </ContactContext.Provider>
    )
}

export const useContact = () =>{
    const context = useContext(ContactContext);
    if(!context){
        throw new Error('useContact must be used within a ContactProvider');
    }
    return context;
}
